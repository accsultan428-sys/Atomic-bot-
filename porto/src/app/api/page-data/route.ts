import { NextResponse } from "next/server";

const experienceData = [
    {
        icon: "/images/icon/tailwind-icon.svg",
        role: "Full Stack Dev & Bot Engineer — Atomicals LancarJaya",
        location: "Remote",
        startYear: "2024",
        endYear: "Present",
        bulletPoints: [
            "Built atomic_bot from scratch — a Discord bot handling moderation, ticketing, payments & reminders in TypeScript",
            "Shipped jkt48_bot for real-time JKT48 live notifications via Showroom & IDN",
            "Designed a shared PostgreSQL layer used across three bots at once",
            "Built a Next.js 15 web dashboard for bot stats, staff management & ticket transcripts"
        ]
    },
    {
        icon: "/images/icon/asana-icon.svg",
        role: "Freelance Full Stack Developer",
        location: "Bandung, Indonesia",
        startYear: "2022",
        endYear: "2024",
        bulletPoints: [
            "Worked on web apps & REST APIs for clients in e-commerce and service industries",
            "Built UIs with React, Next.js & Tailwind CSS",
            "Handled deployments on Railway & Vercel"
        ]
    },
]

const educationData = [
    {
        date: "2026 - Present",
        title: "Senior High School — Grade 10",
        subtitle: "SMA — Bandung, Indonesia"
    },
    {
        date: "2023",
        title: "Full Stack Web Dev — Self-taught",
        subtitle: "React, Next.js, Node.js, PostgreSQL"
    },
    {
        date: "2023",
        title: "Discord Bot Dev — Self-taught",
        subtitle: "discord.js v14, TypeScript, REST API, PostgreSQL"
    }
];

const projectOverview = {
    caseStudies: [
        { name: "atomic_bot — Discord Bot Platform", url: "https://github.com/bimoraa/atomic_bot" },
        { name: "atomic_bot Web Dashboard", url: "#" },
    ],
    sideProjects: [
        { name: "jkt48_bot — Live Stream Notifier", url: "https://github.com/bimoraa/atomic_bot" },
        { name: "bypass_bot — Auto Link Bypass", url: "https://github.com/bimoraa/atomic_bot" },
        { name: "Staff Information System", comingSoon: true },
        { name: "Account Tracker Bot", comingSoon: true },
    ]
};

export const GET = async () => {
    return NextResponse.json({
        experienceData,
        educationData,
        projectOverview
    });
};