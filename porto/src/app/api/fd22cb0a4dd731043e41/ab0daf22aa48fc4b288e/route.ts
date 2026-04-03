// - proxy stream route — path segments are SHA256-derived, upstream URL is not exposed - \\

import { NextResponse } from "next/server"

// - upstream target - \\
const __upstream = "https://azure48.xyz/api/bot-stats/stream"

export async function GET(): Promise<Response> {
  try {
    const upstream_res = await fetch(__upstream, {
      headers: {
        "Accept"     : "text/event-stream, application/json",
        "Cache-Control": "no-cache",
      },
      // - next.js should not cache this - \\
      cache: "no-store",
    })

    if (!upstream_res.ok) {
      return NextResponse.json(
        { error: "upstream error", status: upstream_res.status },
        { status: upstream_res.status },
      )
    }

    const content_type = upstream_res.headers.get("content-type") ?? "application/json"

    // - if upstream returns SSE stream, pipe it through as-is - \\
    if (upstream_res.body) {
      return new Response(upstream_res.body, {
        status : 200,
        headers: {
          "Content-Type"                : content_type,
          "Cache-Control"               : "no-cache, no-store, must-revalidate",
          "X-Accel-Buffering"           : "no",
          "Transfer-Encoding"           : "chunked",
          "Access-Control-Allow-Origin" : "*",
        },
      })
    }

    const data = await upstream_res.json()
    return NextResponse.json(data)

  } catch (err) {
    return NextResponse.json(
      { error: "failed to reach upstream" },
      { status: 502 },
    )
  }
}
