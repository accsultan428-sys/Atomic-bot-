import { NextResponse } from "next/server";

const featureWork = [
    {
        title: "atomic_bot — Discord Bot Platform",
        description: "Three Discord bots in one TypeScript monorepo: server moderation, middleman ticketing, JKT48 live notifications & auto link bypass. Live in production, running on real servers.",
        roles: ["TypeScript", "discord.js", "PostgreSQL"],
        image: "/images/feature-work/feature-img-1.png"
    },
    {
        title: "atomic_bot Web Dashboard",
        description: "Next.js 15 dashboard for checking bot stats in real-time, managing staff, browsing ticket transcripts, running recruitment flows & handling tempvoice channels.",
        roles: ["Next.js 15", "shadcn/ui", "Tailwind CSS"],
        image: "/images/feature-work/feature-img-2.png"
    }
]

export const GET = async () => {
    return NextResponse.json({
        featureWork
    });
};