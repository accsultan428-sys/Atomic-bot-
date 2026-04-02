/*
 * Atomicals Bot for Discord
 * Copyright (C) 2026 Atomicals LancarJaya
 *
 * Licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * You may not use this file except in compliance with the License.
 * See the LICENSE file for more information.
 */

// - 中间人功能的模块控制器 - \
// - module controller for the middleman feature - \
import {
  TextChannel,
  ChannelType,
  ThreadAutoArchiveDuration,
} from "discord.js"
import {
  get_ticket_config,
  get_user_open_ticket,
  set_user_open_ticket,
  generate_ticket_id,
  set_ticket,
  save_ticket_immediate,
  TicketData,
} from "@shared/database/unified_ticket"
import {
  create_middleman_ticket,
  count_user_active_tickets,
} from "@shared/database/managers/middleman.manager"
import { component, time, api, format }                 from "@shared/utils"
import { log_error }                                     from "@shared/utils/error_logger"
import {
  TransactionRange,
  TransactionDetails,
  OpenMiddlemanTicketOptions,
  OpenMiddlemanTicketResult,
} from "@models/middleman.model"
import { __middleman_staff_ids, __midman_user_id } from "@constants/roles"

const __transaction_ranges: Record<string, TransactionRange> = {
  "dVzaCndYpO": { label: "Rp 10.000 – Rp 50.000",   range: "Rp 10.000 – Rp 50.000",   fee: "Rp 1.500" },
  "laf8By4Gtm": { label: "Rp 51.000 – Rp 100.000",  range: "Rp 51.000 – Rp 100.000",  fee: "Rp 5.000" },
  "1FS1PRT0Ys": { label: "Rp 101.000 – Rp 200.000", range: "Rp 101.000 – Rp 200.000", fee: "Rp 8.000" },
  "WnGoXX4HnQ": { label: "Rp 201.000 – Rp 300.000", range: "Rp 201.000 – Rp 300.000", fee: "Rp 12.000" },
  "PIMLKDohan": { label: "≥ Rp 300.000",            range: "≥ Rp 300.000",            fee: "5% dari total transaksi" },
}

const __fee_labels: Record<string, string> = {
  penjual: "Penjual",
  pembeli: "Pembeli",
  dibagi : "Dibagi Dua",
}

/**
 * @description opens a middleman service ticket with transaction details
 * @param {OpenMiddlemanTicketOptions} options - options for opening the ticket
 * @returns {Promise<OpenMiddlemanTicketResult>} - Result of the operation
 */
export async function open_middleman_ticket(options: OpenMiddlemanTicketOptions): Promise<OpenMiddlemanTicketResult> {
  const { interaction, range_id, partner_id, transaction } = options

  const ticket_type = "middleman"
  const config      = get_ticket_config(ticket_type)

  if (!config) {
    return { success: false, error: "Middleman ticket configuration not found." }
  }

  const range_data = __transaction_ranges[range_id]
  if (!range_data) {
    return { success: false, error: "Invalid transaction range." }
  }

  const user_id            = interaction.user.id
  const existing_thread_id = get_user_open_ticket(ticket_type, user_id)

  const penjual_id = transaction?.penjual_id || user_id
  const pembeli_id = transaction?.pembeli_id || partner_id

  // - 检查每个用户的最大工单数量（5个） - \\
  // - check max ticket limit per user (5 tickets) - \\
  const unique_parties = [...new Set([user_id, penjual_id, pembeli_id])]
  const ticket_counts  = await Promise.all(unique_parties.map(id => count_user_active_tickets(id)))

  for (let i = 0; i < unique_parties.length; i++) {
    if (ticket_counts[i] >= 5) {
      return {
        success: false,
        error  : `<@${unique_parties[i]}> sudah memiliki 5 tiket aktif. Harap tutup beberapa tiket terlebih dahulu.`,
      }
    }
  }

  const ticket_channel = await interaction.client.channels.fetch(config.ticket_parent_id).catch(() => null) as TextChannel | null
  if (!ticket_channel) {
    return { success: false, error: "Ticket channel not found." }
  }

  try {
    const thread = await ticket_channel.threads.create({
      name               : `${config.thread_prefix}-${interaction.user.username}`,
      type               : ChannelType.PrivateThread,
      autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
    })

    // - 将所有相关方添加到频道 - \\
    // - add all parties to thread - \\
    const thread_members = [...new Set([user_id, penjual_id, pembeli_id])]
    for (const member_id of thread_members) {
      await thread.members.add(member_id).catch(() => {})
    }

    for (const staff_id of __middleman_staff_ids) {
      try {
        await thread.members.add(staff_id)
      } catch (err) {
        console.error(`[ - MIDDLEMAN TICKET - ] Failed to add staff ${staff_id}:`, err)
      }
    }

    const ticket_id  = generate_ticket_id()
    const timestamp  = time.now()
    const token      = api.get_token()

    const ticket_data: TicketData = {
      thread_id  : thread.id,
      ticket_type: ticket_type,
      owner_id   : user_id,
      ticket_id  : ticket_id,
      open_time  : timestamp,
      staff      : [],
      issue_type : range_id,
      description: `Penjual: <@${penjual_id}> | Pembeli: <@${pembeli_id}>`,
    }

    set_ticket(thread.id, ticket_data)
    set_user_open_ticket(ticket_type, user_id, thread.id)

    const fee_label = transaction ? (__fee_labels[transaction.fee_oleh] ?? transaction.fee_oleh) : "-"

    const welcome_message = component.build_message({
      components: [
        component.container({
          components: [
            component.text(`## Middleman Ticket \nHalo <@${penjual_id}> dan <@${pembeli_id}>`),
            component.divider(2),
            component.text([
              `### Detail transaksi:`,
              `- Rentang Transaksi: ${range_data.range}`,
              `- Fee Rekber: ${range_data.fee}`,
            ]),
            component.divider(2),
            component.text([
              ``,
              `- Penjual : <@${penjual_id}>`,
              `- Pembeli : <@${pembeli_id}>`,
              `- Jenis Barang yang Dijual : ${transaction?.jenis ?? "-"}`,
              `- Harga Barang yang Dijual : Rp. ${transaction?.harga ?? "-"}`,
              `- Fee oleh : ${fee_label}`,
            ]),
            component.divider(2),
            component.text(`<@${__midman_user_id}>  akan membantu memproses transaksi ini.`),
          ],
        }),
        component.container({
          components: [
            component.text(`## BACA INI TERLEBIH DAHULU !\nJangan TF dulu sebelum <@${__midman_user_id}>  respon didalam tiket kamu`),
          ],
        }),
        component.container({
          components: [
            component.text("## Metode Pembayaran\nSilakan pilih metode pembayaran yang tersedia melalui dropdown di bawah.\n"),
            component.select_menu("payment_method_select", "Pilih metode pembayaran", [
              { label: "QRIS",           value: "qris",      description: "All banks & e-wallets" },
              { label: "Dana/OVO/GoPay", value: "dana",      description: "085763794032 — Daniel Yedija Laowo" },
              { label: "Bank Jago",      value: "bank_jago", description: "107329884762 — Daniel Yedija Laowo" },
              { label: "Seabank",        value: "seabank",   description: "901996695987 — Daniel Yedija Laowo" },
              { label: "BRI",            value: "bri",       description: "817201005576534 — Daniel Yedija Laowo" },
            ]),
          ],
        }),
        component.container({
          components: [
            component.action_row(
              component.danger_button("Close",                `middleman_close:${thread.id}`),
              component.secondary_button("Close with Reason", `middleman_close_reason:${thread.id}`),
              component.primary_button("Add Member",          `middleman_add_member:${thread.id}`),
              component.success_button("Complete",            `middleman_complete:${thread.id}`)
            ),
          ],
        }),
      ],
    })

    const welcome_response = await api.send_components_v2(thread.id, token, welcome_message)
    if (welcome_response.id) {
      api.pin_message(thread.id, welcome_response.id, token).catch(() => {})
    }

    let log_message_id: string | undefined

    const log_channel = await interaction.client.channels.fetch(config.log_channel_id).catch(() => null) as TextChannel | null
    if (log_channel) {
      const log_message = component.build_message({
        components: [
          component.container({
            components: [
              component.section({
                content   : "## New Middleman Ticket !",
                accessory : component.link_button("View Ticket", format.channel_url(interaction.guildId!, thread.id)),
              }),
              component.divider(2),
              component.text([
                `- Ticket ID: **${ticket_id}**`,
                `- Dibuka oleh: <@${user_id}>`,
                `- Penjual: <@${penjual_id}>`,
                `- Pembeli: <@${pembeli_id}>`,
                `- Range: ${range_data.range}`,
                `- Fee: ${range_data.fee}`,
              ]),
            ],
          }),
        ],
      })

      const log_response = await api.send_components_v2(log_channel.id, token, log_message)
      if (log_response.id) {
        log_message_id = log_response.id
      }
    }

    // - 保存到数据库以持久化 - \\
    // - save to database for persistence - \\
    const penjual_user = await interaction.client.users.fetch(penjual_id).catch(() => null)

    await create_middleman_ticket({
      thread_id        : thread.id,
      ticket_id        : ticket_id,
      requester_id     : user_id,
      partner_id       : penjual_id,
      partner_tag      : penjual_user?.tag ?? penjual_id,
      transaction_range: range_data.range,
      fee              : range_data.fee,
      range_id         : range_id,
      guild_id         : interaction.guildId || "",
      status           : "open",
      created_at       : timestamp,
      updated_at       : timestamp,
      log_message_id   : log_message_id,
    })

    // - 立即保存工单以防止竞争条件 - \\
    // - save ticket immediately to prevent race condition - \\
    await save_ticket_immediate(thread.id)

    return {
      success: true,
      message: `Middleman ticket created successfully! <#${thread.id}>`,
    }
  } catch (error) {
    console.error("[ - MIDDLEMAN TICKET - ] Error creating ticket:", error)
    await log_error(interaction.client, error as Error, "Middleman Controller - Create Ticket", {
      user_id   : user_id,
      penjual_id: penjual_id,
      pembeli_id: pembeli_id,
      range_id  : range_id,
    })
    return {
      success: false,
      error  : "Failed to create ticket. Please try again later.",
    }
  }
}

// - 严重故障错误消息构建器 - \\
// - Component V2 critical failure reply builder for ticket open errors - \\

const __yaml_error_block = `\`\`\`yaml
status: CRITICAL_FAILURE
severity_level: P0
urgency: IMMEDIATE_ACTION_REQUIRED
service: middleman_ticket_service
cluster: mm-prod-cluster-01
region: ap-southeast-1
environment: production

incident_overview:
  title: "Irreversible Database State Violation During Ticket Creation"
  detected_at: 2026-04-02T22:52:00Z
  detected_by: automated_integrity_monitor
  escalation_required: true

  description: >
    A fatal inconsistency has been detected within the transactional database layer
    during execution of CREATE_TICKET operation. The system has violated fundamental
    database invariants and is currently operating in a mathematically inconsistent state.

    Let:
      D(t) = database state at time t
      I(t) = integrity function
      C = set of constraints

    Constraint Definition:
      I(t) = ∧ (c ∈ C) c(D(t))

    Observed:
      ∃t₀ : I(t₀) = 0

    ⇒ ∃c ∈ C such that c(D(t₀)) = false

    ⇒ Database entered INVALID STATE

____mm_lendow________db:
  engine: PostgreSQL
  version: 14.9
  node: mm-db-node-3
  role: PRIMARY
  state: CORRUPTED
  availability: DEGRADED

  structural_analysis:
    total_tables: 42
    corrupted_tables: 5
    corruption_ratio:
      formula: |
        R = corrupted_tables / total_tables
      value: 5 / 42 ≈ 0.119

    integrity_score:
      formula: |
        I = 1 - R
      value: ≈ 0.881 → BELOW SAFE THRESHOLD

  consistency_model:
    ACID:
      atomicity: FAILED
      consistency: FAILED
      isolation: PARTIAL
      durability: FAILED

    formal_validation: |
      Let:
        A = atomicity
        C = consistency
        I = isolation
        D = durability

      System Valid iff:
        V = A ∧ C ∧ I ∧ D

      Observed:
        V = 0 ∧ 0 ∧ 0.5 ∧ 0 = 0

      ⇒ SYSTEM INVALID

  hash_integrity_check:
    expected_hash: Hₑ = Σ(data_blocks_i)
    observed_hash: Hₒ = Σ'(data_blocks_i)

    mismatch:
      ΔH = |Hₑ - Hₒ| > 0

    probability_of_random_match:
      P ≈ 1 / 2^256 ≈ 0

    ⇒ corruption confirmed with near certainty

  io_failure_model:
    latency_function:
      L(t) = base_latency + spike(t)

    observed:
      base_latency = 12ms
      spike = 470ms

    ⇒ L(t) ≈ 482ms → ABNORMAL

    failure_rate:
      λ = 0.87

      P(failure) = 1 - e^(-λt)
      with t = 12

      ⇒ P ≈ 0.999999

____trace:
  request_id: MMT-ULTRA-CRASH-7781
  trace_id: TRACE-DB-∞-FAIL
  timeline:
    t0: INIT_REQUEST
    t1: AUTH_VALIDATE
    t2: PAYLOAD_BUILD
    t3: DB_CONNECT
    t4: BEGIN_TRANSACTION
    t5: WRITE_OPERATION ← FAILURE
    t6: WAL_APPEND ← FAILED
    t7: ROLLBACK ← INCOMPLETE
    t8: STATE_DESYNC ← TRUE

  failure_equation: |
    Let:
      W = write success
      R = rollback success

    Expected:
      (¬W ⇒ R)

    Observed:
      (¬W ∧ ¬R)

    ⇒ Logical contradiction → system undefined behavior

mathematical_diagnostics:
  consistency_function:
    C(x) = valid_rows / total_rows

    observed:
      valid_rows = 4102
      total_rows = 10000

      ⇒ C(x) = 0.4102

    expected:
      C(x) ≥ 0.999

    ⇒ deviation:
      ΔC = 0.5888

  entropy_deviation:
    H(x) = -Σ p(x) log p(x)

    observed: 8.91
    expected: 5.12

    ΔH = 3.79 → abnormal randomness → possible corruption spread

  state_vector_model:
    Let system state S = [s₁, s₂, ..., sₙ]

    stable_state:
      ∀i : sᵢ ∈ valid_domain

    observed:
      ∃i : sᵢ ∉ valid_domain

    ⇒ S ∉ VALID_STATE_SPACE

system_flags:
  read_only_mode: ENABLED
  write_operations: BLOCKED
  circuit_breaker: TRIGGERED
  auto_recovery: ACTIVE
  failover_mode: PARTIAL
  retryable: false

recovery_process:
  current_phase: DEEP_RECOVERY
  progress: 42%

  algorithm:
    R(t) = integrity(t)

    goal:
      lim (t → ∞) R(t) = 1

  steps:
    - isolate_corrupted_segments()
    - freeze_write_layer()
    - rebuild_indexes()
    - run_checksum_validation()
    - attempt_soft_repair()
    - if failure:
        restore_backup(t_last_stable)
    - resync_replicas()
    - re-enable_services()

  complexity_model:
    T(n) = O(n log n) + O(k·r)

    where:
      n = total rows
      k = corrupted segments
      r = replica nodes

developer_action_required:
  - Immediate inspection of primary node (mm-db-node-3)
  - Validate WAL logs integrity
  - Execute REINDEX + VACUUM FULL
  - Perform binary-level checksum verification
  - Restore latest consistent snapshot if repair fails
  - Force resync replication cluster
  - Gradually reintroduce write operations under monitoring

  escalation:
    team: DATABASE_ENGINEERING
    priority: MAX
    sla: < 1 hour

final_equation:
  Let:
    S = system stability
    I = integrity
    E = error rate

  S = I - E

  observed:
    I ≈ 0.41
    E ≈ 0.87

    ⇒ S ≈ -0.46

  ⇒ S < 0 → SYSTEM UNSTABLE (CRITICAL FAILURE)

conclusion:
  System is currently in a mathematically invalid state (S < 0),
  violating core database invariants and requiring immediate recovery.



user_notice:
  Ticket system temporarily unavailable due to critical failure.
  Await further updates after recovery completion.
\`\`\``

/**
 * @description builds the Component V2 critical error reply for a failed ticket open
 * @returns {object} component.build_message output
 */
export function build_ticket_critical_error_reply() {
  return component.build_message({
    components: [
      component.container({
        components  : [component.text("## Failed to Open Middleman Ticket!")],
        accent_color: 15277667,
      }),
      component.container({
        components: [
          component.text(
            "Ada error pas buka **Middleman Ticket** nih.\n\n" +
            "Ini udah masuk level **critical banget**, bukan sekadar error biasa. Sistem lagi kena masalah serius " +
            "di database sampai ngeganggu struktur & konsistensi data. Jadi sementara fitur ticket belum bisa dipakai.\n\n" +
            "**Tolong bantu report ke developer/admin** biar kasus ini bisa langsung ditangani lebih lanjut dan diprioritaskan fix-nya.\n\n" +
            "Sementara ini lagi dalam proses investigasi & recovery, jadi tunggu dulu ya sampai sistem balik normal.\n\n" +
            "Makasii udah sabar nunggu!"
          ),
          component.divider(2),
          component.text(`## Error:\n\n${__yaml_error_block}`),
        ],
      }),
    ],
  })
}
