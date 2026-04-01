/*
 * Atomicals Bot for Discord
 * Copyright (C) 2026 Atomicals LancarJaya
 *
 * Licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * You may not use this file except in compliance with the License.
 * See the LICENSE file for more information.
 */

export interface security_automod_config_model {
  guild_id      : string
  enabled       : boolean
  log_channel_id: string | null
  updated_by    : string
  updated_at    : number
}

export interface security_automod_word_model {
  guild_id   : string
  word       : string
  created_by : string
  created_at : number
}
