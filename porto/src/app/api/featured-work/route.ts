import { NextResponse } from "next/server";

// - pre-render at build time, served as static file — zero compute on every request - \\
export const dynamic = "force-static"

const featureWork = [
    {
        title: "atomic_bot — Discord Bot Platform",
        description: "Three Discord bots in one TypeScript monorepo: server moderation, middleman ticketing, JKT48 live notifications & auto link bypass. Live in production, running on real servers.",
        roles: ["TypeScript", "discord.js", "PostgreSQL"],
        image: "/images/feature-work/feature-img-1.png",
        detail: {
            headline: "Full-stack Discord bot ecosystem serving real communities",
            summary: "atomic_bot is a production-grade TypeScript monorepo housing three independent Discord bots that share a common utility layer. Built for performance, reliability, and zero-downtime deployments on Railway.",
            bots: [
                {
                    name: "atomic_bot",
                    purpose: "Main server management",
                    features: [
                        "Slash command framework with middleware pipeline (error handling, permission checks)",
                        "Middleman ticket system — automated thread creation, staff claiming, transcript saving to PostgreSQL",
                        "Payment verification flow with receipt upload, admin approval, and role granting",
                        "Staff recruitment pipeline — application forms, review panels, voting, and acceptance",
                        "Moderation toolkit — quarantine, warn, mute, ban with audit logging",
                        "Custom auto-responder engine with pattern matching and dynamic variables",
                        "Reaction roles with multi-select menu builder",
                        "Reminder & AFK system with persistent DB-backed scheduling",
                        "Temporary voice channels with owner controls (rename, limit, lock, permit)",
                        "Account tracker integration for monitoring external platform statuses",
                    ],
                },
                {
                    name: "jkt48_bot",
                    purpose: "JKT48 live stream notifications",
                    features: [
                        "Real-time IDN Live & Showroom stream detection via polling",
                        "Auto-embed with member profile, stream title, and thumbnail",
                        "Configurable notification channels per guild",
                        "Member UUID mapping for accurate identification",
                    ],
                },
                {
                    name: "bypass_bot",
                    purpose: "Automatic link bypassing",
                    features: [
                        "Detects shortened/ad-walled links in messages automatically",
                        "Upstream API integration with retry queue, global backoff, and request deduplication",
                        "URL-based result caching in PostgreSQL (30-min TTL) to minimize API calls",
                        "Per-guild enable/disable and channel-scoped bypass settings",
                    ],
                },
            ],
            tech_stack: [
                { name: "TypeScript", role: "Primary language — strict mode, path aliases" },
                { name: "discord.js v14", role: "Discord API wrapper with Component V2 messages" },
                { name: "PostgreSQL", role: "Persistent data — tickets, transcripts, reminders, configs" },
                { name: "Express.js", role: "HTTP layer — webhooks, REST API for dashboard, health checks" },
                { name: "Railway", role: "Hosting & CI/CD — auto-deploy on push, zero-downtime" },
                { name: "Lavalink", role: "Music playback engine for voice channel features" },
            ],
            architecture_notes: [
                "Monorepo with @shared, @atomic, @jkt48, @bypass path aliases",
                "Discord cache intentionally disabled — all data fetched via REST for consistency",
                "Component V2 only — no legacy embeds or plain content messages",
                "Middleware pipeline for command execution (error handler, permission gates)",
                "Ring-buffer latency tracking middleware on HTTP layer for performance monitoring",
            ],
            stats: {
                lines_of_code: "25,000+",
                active_servers: "Production",
                uptime: "99.9%",
                database_tables: "20+",
            },
        },
    },
    {
        title: "atomic_bot Web Dashboard",
        description: "Next.js 15 dashboard for checking bot stats in real-time, managing staff, browsing ticket transcripts, running recruitment flows & handling tempvoice channels.",
        roles: ["Next.js 15", "shadcn/ui", "Tailwind CSS"],
        image: "/images/feature-work/feature-img-2.png",
        detail: {
            headline: "Real-time admin dashboard for the atomic_bot ecosystem",
            summary: "A Next.js 15 dashboard with dark-mode-only UI that provides full control over the Discord bot platform — from server stats to ticket transcripts to staff management.",
            pages: [
                {
                    name: "Bot Stats",
                    description: "Live server count, member count, uptime, memory usage, and WebSocket ping — pulled from the bot's Express API.",
                },
                {
                    name: "Ticket Transcripts",
                    description: "Searchable archive of every closed ticket. Full message history with timestamps, attachments, and staff actions. Shareable via unique transcript URLs.",
                },
                {
                    name: "Staff Management",
                    description: "View active staff, roles, and permissions. Staff information pages with multi-language support (EN, ID, JP).",
                },
                {
                    name: "Recruitment Area",
                    description: "Configure recruitment rounds, review applications with voting panels, and send acceptance/rejection notifications directly from the dashboard.",
                },
                {
                    name: "Bypass Tool",
                    description: "Web-based link bypass interface with real-time status, rate limiting feedback, and supported-service browser.",
                },
                {
                    name: "Tempvoice Manager",
                    description: "Overview of active temporary voice channels, owner assignments, and configuration per guild.",
                },
            ],
            tech_stack: [
                { name: "Next.js 15", role: "App Router, Server Components, API routes" },
                { name: "shadcn/ui", role: "Component library — dark mode only, original color tokens" },
                { name: "Tailwind CSS v4", role: "Utility-first styling with custom design tokens" },
                { name: "PostgreSQL", role: "Direct DB queries via pg pool for transcript & stats data" },
                { name: "Discord OAuth2", role: "Authentication flow for staff-only access" },
            ],
            architecture_notes: [
                "Server Components for data-heavy pages, Client Components for interactive panels",
                "API routes proxy Discord REST calls to keep bot token server-side",
                "Static generation for public pages, dynamic for authenticated routes",
                "Responsive design — works on mobile for on-the-go moderation",
            ],
            stats: {
                pages: "15+",
                api_routes: "20+",
                auth: "Discord OAuth2",
                theme: "Dark mode only",
            },
        },
    },
]

export const GET = async () => {
    return NextResponse.json(
        { featureWork },
        { headers: { "Cache-Control": "public, max-age=31536000, immutable" } },
    )
};