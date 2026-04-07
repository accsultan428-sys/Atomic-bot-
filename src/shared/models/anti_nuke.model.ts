/*
 * Atomicals Bot for Discord
 * Copyright (C) 2026 Atomicals LancarJaya
 *
 * Licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * You may not use this file except in compliance with the License.
 * See the LICENSE file for more information.
 */

// - anti-nuke system data model interfaces - \\

export type anti_nuke_event_type =
  | "channel_delete"
  | "channel_create"
  | "role_delete"
  | "role_create"
  | "guild_ban_add"
  | "member_kick"
  | "webhook_update"

export type anti_nuke_action = "observe" | "soft_alert" | "quarantine"

export interface anti_nuke_whitelist_record {
  _id?     : any
  user_id  : string
  guild_id : string
  added_by : string
  added_at : number
}

export interface anti_nuke_channel_snapshot {
  _id?         : any
  incident_id  : string
  guild_id     : string
  channel_id   : string
  channel_name : string
  channel_type : number
  position     : number
  parent_id    : string | null
  topic        : string | null
  nsfw         : boolean
  captured_at  : number
}

export interface anti_nuke_role_snapshot {
  _id?          : any
  incident_id   : string
  guild_id      : string
  role_id       : string
  role_name     : string
  position      : number
  color         : number
  permissions_bf: string
  hoist         : boolean
  mentionable   : boolean
  captured_at   : number
}

export interface anti_nuke_incident {
  _id?          : any
  incident_id   : string
  guild_id      : string
  executor_id   : string
  event_types   : string[]
  event_count   : number
  final_score   : number
  action_taken  : anti_nuke_action
  previous_roles: string[]
  reverted      : boolean
  reverted_by   : string | null
  reverted_at   : number | null
  timestamp     : number
}

export interface anti_nuke_config_record {
  _id?                : any
  guild_id            : string
  enabled             : boolean
  log_channel_id      : string | null
  staff_role_id       : string | null
  maintenance_mode    : boolean
  maintenance_until   : number
  soft_alert_threshold: number
  quarantine_threshold: number
}
