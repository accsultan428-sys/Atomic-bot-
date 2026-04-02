"use client"

// - text shimmer — sweeping gradient highlight across text - \\

import { CSSProperties }  from "react"
import { cn }             from "@/lib/utils"

interface TextShimmerProps {
  children  : string
  as?       : React.ElementType
  className?: string
  duration? : number   // animation duration in seconds (default 2)
  spread?   : number   // gradient spread multiplier (default 2)
}

/**
 * @description Renders a sweeping shimmer gradient across text using CSS animation
 * @param children  text to animate
 * @param as        HTML element to render as (default "p")
 * @param className optional extra classes
 * @param duration  animation duration in seconds (default 2)
 * @param spread    gradient spread in em units (default 2)
 * @returns shimmer text element
 */
export const TextShimmer = ({
  children,
  as       : Component = "p",
  className,
  duration = 2,
  spread   = 2,
}: TextShimmerProps) => {
  return (
    <Component
      style={
        {
          "--shimmer-duration": `${duration}s`,
          "--spread"          : `${spread}em`,
        } as CSSProperties
      }
      className={cn(
        "relative inline-block bg-[length:250%_100%,auto] bg-clip-text",
        "text-transparent [--base-color:#a1a1aa] [--base-gradient-color:#000]",
        "dark:[--base-color:#71717a] dark:[--base-gradient-color:#ffffff]",
        "bg-[linear-gradient(110deg,var(--base-color)_25%,var(--base-gradient-color)_50%,var(--base-color)_75%)] ",
        "animate-[shimmer_var(--shimmer-duration)_infinite_linear]",
        className,
      )}
    >
      {children}
    </Component>
  )
}
