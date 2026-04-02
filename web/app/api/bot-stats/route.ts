import { NextResponse } from 'next/server'
import { pool }         from '@/lib/db'

// - bot Express 服务器 URL - \\
// - bot Express server URL - \\
const __bot_url = process.env.NEXT_PUBLIC_BOT_URL || 'https://atomicbot-production.up.railway.app'

export interface bot_stats_payload {
  // - bot status - \\
  status          : 'alive' | 'starting' | 'offline'
  bot_ready       : boolean
  // - latency - \\
  ws_ping         : number
  api_latency     : number
  db_latency      : number
  // - shards / commands - \\
  shard_count     : number
  shard_pings     : number[]
  command_count   : number
  // - runtime info - \\
  node_version    : string
  platform        : string
  cpu_pct         : number
  // - memory - \\
  memory          : {
    rss_mb          : number
    heap_used_mb    : number
    heap_total_mb   : number
    external_mb     : number
    array_buffers_mb: number
  }
  // - uptime - \\
  uptime          : number
  uptime_formatted: string
  // - timestamps - \\
  timestamp       : number
  sampled_at      : number
}

/**
 * @description formats uptime seconds into a human-readable string
 * @param {number} seconds - uptime in seconds
 * @returns {string} formatted uptime
 */
function format_uptime(seconds: number): string {
  const d = Math.floor(seconds / 86400)
  const h = Math.floor((seconds % 86400) / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  if (d > 0) return `${d}d ${h}h ${m}m`
  if (h > 0) return `${h}h ${m}m ${s}s`
  if (m > 0) return `${m}m ${s}s`
  return `${s}s`
}

/**
 * @description measures DB latency by running a simple SELECT 1
 * @returns {Promise<number>} latency in ms, or -1 if unavailable
 */
async function measure_db_latency(): Promise<number> {
  try {
    const client = await pool.connect()
    try {
      const start     = Date.now()
      await client.query('SELECT 1')
      return Date.now() - start
    } finally {
      client.release()
    }
  } catch {
    return -1
  }
}

/**
 * @route GET /api/bot-stats
 * @description Returns combined bot + DB stats snapshot.
 * @returns {bot_stats_payload}
 */
export async function GET() {
  // - 独立计时，避免 DB 延迟污染 bot fetch 时间 - \\
  // - independently timed so DB latency doesn't contaminate api_latency - \\
  const bot_start   = Date.now()
  const bot_promise = fetch(`${__bot_url}/api/bot-stats`, {
    signal: AbortSignal.timeout(8000),
    next  : { revalidate: 0 },
  }).then(r => ({ response: r, latency: Date.now() - bot_start }))

  const [db_latency_result, bot_timed] = await Promise.allSettled([
    measure_db_latency(),
    bot_promise,
  ])

  const db_latency  = db_latency_result.status === 'fulfilled' ? db_latency_result.value : -1
  const api_latency = bot_timed.status === 'fulfilled' ? bot_timed.value.latency : -1
  const bot_response = bot_timed.status === 'fulfilled' ? bot_timed.value.response : null

  // - bot unreachable - \\
  if (!bot_response || !bot_response.ok) {
    const payload: bot_stats_payload = {
      status          : 'offline',
      bot_ready       : false,
      ws_ping         : -1,
      api_latency,
      db_latency,
      shard_count     : 0,
      shard_pings     : [],
      command_count   : 0,
      node_version    : '—',
      platform        : '—',
      cpu_pct         : 0,
      memory          : { rss_mb: 0, heap_used_mb: 0, heap_total_mb: 0, external_mb: 0, array_buffers_mb: 0 },
      uptime          : 0,
      uptime_formatted: '—',
      timestamp       : Date.now(),
      sampled_at      : Date.now(),
    }
    return NextResponse.json(payload, { headers: { 'Cache-Control': 'no-store' } })
  }

  const raw = await bot_response.json()

  const payload: bot_stats_payload = {
    status          : raw.status          ?? 'offline',
    bot_ready       : raw.bot_ready       ?? false,
    ws_ping         : raw.ws_ping         ?? -1,
    api_latency,
    db_latency,
    shard_count     : raw.shard_count     ?? 0,
    shard_pings     : raw.shard_pings     ?? [],
    command_count   : raw.command_count   ?? 0,
    node_version    : raw.node_version    ?? '—',
    platform        : raw.platform        ?? '—',
    cpu_pct         : raw.cpu_pct         ?? 0,
    memory          : raw.memory ?? { rss_mb: 0, heap_used_mb: 0, heap_total_mb: 0, external_mb: 0, array_buffers_mb: 0 },
    uptime          : raw.uptime          ?? 0,
    uptime_formatted: format_uptime(raw.uptime ?? 0),
    timestamp       : raw.timestamp       ?? Date.now(),
    sampled_at      : Date.now(),
  }

  return NextResponse.json(payload, { headers: { 'Cache-Control': 'no-store' } })
}
