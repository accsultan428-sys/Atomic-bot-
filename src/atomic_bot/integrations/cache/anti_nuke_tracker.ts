/*
 * Atomicals Bot for Discord
 * Copyright (C) 2026 Atomicals LancarJaya
 *
 * Licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * You may not use this file except in compliance with the License.
 * See the LICENSE file for more information.
 */

// - in-memory anti-nuke tracker with rolling window scoring and decay - \\
import { GuildMember }              from "discord.js"
import {
  __anti_nuke_event_weights,
  __anti_nuke_window_ms,
  __anti_nuke_thresholds,
  __anti_nuke_velocity_ms,
  __anti_nuke_velocity_multipliers,
  __anti_nuke_diversity_multipliers,
  __anti_nuke_context_bias,
}                                   from "@constants/anti_nuke"
import { anti_nuke_event_type }     from "@models/anti_nuke.model"

export type score_tier = "silent" | "observe" | "soft_alert" | "quarantine"

export interface score_result {
  tier       : score_tier
  score      : number
  event_count: number
  event_types: anti_nuke_event_type[]
}

interface nuke_event_entry {
  type      : anti_nuke_event_type
  weight    : number
  timestamp : number
}

interface nuke_user_state {
  events     : nuke_event_entry[]
  quarantined: boolean
}

// - singleton: guild_id → (user_id → state) - \\
const tracker = new Map<string, Map<string, nuke_user_state>>()

// ─── helpers ──────────────────────────────────────────────────────────────────

function get_user_state(guild_id: string, user_id: string): nuke_user_state {
  let guild_map = tracker.get(guild_id)
  if (!guild_map) {
    guild_map = new Map()
    tracker.set(guild_id, guild_map)
  }

  let state = guild_map.get(user_id)
  if (!state) {
    state = { events: [], quarantined: false }
    guild_map.set(user_id, state)
  }

  return state
}

function prune_old_events(state: nuke_user_state): void {
  const cutoff = Date.now() - __anti_nuke_window_ms
  state.events  = state.events.filter(e => e.timestamp >= cutoff)
}

function get_velocity_multiplier(state: nuke_user_state): number {
  if (state.events.length < 2) return __anti_nuke_velocity_multipliers.normal

  const second_to_last = state.events[state.events.length - 2]
  const last           = state.events[state.events.length - 1]
  const dt             = last.timestamp - second_to_last.timestamp

  if (dt < __anti_nuke_velocity_ms.burst) return __anti_nuke_velocity_multipliers.burst
  if (dt < __anti_nuke_velocity_ms.fast)  return __anti_nuke_velocity_multipliers.fast
  return __anti_nuke_velocity_multipliers.normal
}

function get_diversity_multiplier(event_types: anti_nuke_event_type[]): number {
  const unique = new Set(event_types).size

  if (unique >= 3) return __anti_nuke_diversity_multipliers.many
  if (unique === 2) return __anti_nuke_diversity_multipliers.two
  return __anti_nuke_diversity_multipliers.one
}

function derive_tier(score: number): score_tier {
  if (score >= __anti_nuke_thresholds.quarantine) return "quarantine"
  if (score >= __anti_nuke_thresholds.soft_alert) return "soft_alert"
  if (score >= __anti_nuke_thresholds.observe)    return "observe"
  return "silent"
}

// ─── public api ───────────────────────────────────────────────────────────────

/**
 * @description calculate context bias for a guild member based on join date
 * @param member - Discord GuildMember
 * @returns number representing the bias to add to the final score
 */
export function get_context_bias(member: GuildMember): number {
  if (!member.joinedTimestamp) return 0

  const age_ms = Date.now() - member.joinedTimestamp

  if (age_ms < 24 * 60 * 60 * 1000)    return __anti_nuke_context_bias.new_member_24h
  if (age_ms < 7 * 24 * 60 * 60 * 1000) return __anti_nuke_context_bias.new_member_7d
  return 0
}

/**
 * @description record a nuke event for a user and compute the composite risk score
 * @param guild_id     - Discord guild ID
 * @param user_id      - Discord user ID of the suspected executor
 * @param event_type   - type of nuke event that occurred
 * @param context_bias - pre-computed context bias for this user
 * @returns score_result with tier and score details
 */
export function track_event(
  guild_id     : string,
  user_id      : string,
  event_type   : anti_nuke_event_type,
  context_bias : number,
): score_result {
  const state  = get_user_state(guild_id, user_id)
  prune_old_events(state)

  state.events.push({
    type      : event_type,
    weight    : __anti_nuke_event_weights[event_type],
    timestamp : Date.now(),
  })

  const raw_score    = state.events.reduce((sum, e) => sum + e.weight, 0)
  const velocity     = get_velocity_multiplier(state)
  const event_types  = state.events.map(e => e.type)
  const diversity    = get_diversity_multiplier(event_types)
  const final_score  = Math.round(raw_score * velocity * diversity + context_bias)
  const unique_types = [...new Set(event_types)]

  return {
    tier       : derive_tier(final_score),
    score      : final_score,
    event_count: state.events.length,
    event_types: unique_types,
  }
}

/**
 * @description mark a user as already quarantined to prevent duplicate actions
 * @param guild_id - Discord guild ID
 * @param user_id  - Discord user ID
 * @returns void
 */
export function mark_quarantined(guild_id: string, user_id: string): void {
  const state        = get_user_state(guild_id, user_id)
  state.quarantined  = true
}

/**
 * @description check if a user was already quarantined this session
 * @param guild_id - Discord guild ID
 * @param user_id  - Discord user ID
 * @returns boolean
 */
export function is_already_quarantined(guild_id: string, user_id: string): boolean {
  const guild_map = tracker.get(guild_id)
  if (!guild_map) return false

  const state = guild_map.get(user_id)
  return state?.quarantined ?? false
}

/**
 * @description clear all tracked events for a user (used after undo/whitelist)
 * @param guild_id - Discord guild ID
 * @param user_id  - Discord user ID
 * @returns void
 */
export function clear_user(guild_id: string, user_id: string): void {
  const guild_map = tracker.get(guild_id)
  guild_map?.delete(user_id)
}
