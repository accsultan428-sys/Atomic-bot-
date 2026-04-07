/*
 * Atomicals Bot for Discord
 * Copyright (C) 2026 Atomicals LancarJaya
 *
 * Licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * You may not use this file except in compliance with the License.
 * See the LICENSE file for more information.
 */

// - anti-nuke system constants: event weights, score thresholds, timing windows - \\

// - base weight for each event type, higher = more suspicious - \\
export const __anti_nuke_event_weights = {
  channel_delete : 10,
  role_delete    : 10,
  webhook_update : 9,
  guild_ban_add  : 8,
  member_kick    : 6,
  channel_create : 3,
  role_create    : 3,
} as const

// - rolling window in milliseconds — events outside this window are discarded - \\
export const __anti_nuke_window_ms = 15_000

// - score tier thresholds - \\
export const __anti_nuke_thresholds = {
  observe    : 25,
  soft_alert : 45,
  quarantine : 70,
} as const

// - velocity time deltas in ms — time since the last event by this user - \\
export const __anti_nuke_velocity_ms = {
  burst : 3_000,
  fast  : 7_000,
} as const

// - velocity multipliers applied to raw score - \\
export const __anti_nuke_velocity_multipliers = {
  burst  : 2.5,
  fast   : 1.5,
  normal : 1.0,
} as const

// - diversity multipliers based on number of unique event types in window - \\
export const __anti_nuke_diversity_multipliers = {
  one  : 1.0,
  two  : 1.4,
  many : 2.0,
} as const

// - context bias added on top of the scaled score - \\
export const __anti_nuke_context_bias = {
  new_member_7d  : 15,
  new_member_24h : 25,
} as const
