"use client"

// - text shimmer wave — per-character 3D wave animation using motion/react - \\

import { useEffect, useState }    from "react"
import { type JSX }               from "react"
import { motion, type Transition } from "motion/react"
import { cn }                      from "@/lib/utils"

type TextShimmerWaveProps = {
  children        : string
  as?             : React.ElementType
  className?      : string
  duration?       : number
  zDistance?      : number
  xDistance?      : number
  yDistance?      : number
  spread?         : number
  scaleDistance?  : number
  rotateYDistance?: number
  transition?     : Transition
}

/**
 * @description Per-character 3D wave shimmer using motion/react — each letter animates in sequence
 * @param children        text string to animate
 * @param as              HTML element to render as (default "p")
 * @param className       optional extra classes
 * @param duration        animation cycle duration in seconds (default 1)
 * @param zDistance       z-axis translate peak (default 10)
 * @param xDistance       x-axis translate peak (default 2)
 * @param yDistance       y-axis translate peak (default -2)
 * @param spread          wave spread multiplier (default 1)
 * @param scaleDistance   scale peak value (default 1.1)
 * @param rotateYDistance rotateY peak in degrees (default 10)
 * @param transition      override motion transition config
 * @returns animated shimmer wave element
 */
export const TextShimmerWave = ({
  children,
  as             : Component    = "p",
  className,
  duration        = 1,
  zDistance       = 10,
  xDistance       = 2,
  yDistance       = -2,
  spread          = 1,
  scaleDistance   = 1.1,
  rotateYDistance = 10,
  transition,
}: TextShimmerWaveProps) => {
  // - create motion component from the given tag - \\
  const MotionComponent = motion.create(Component as keyof JSX.IntrinsicElements)

  // - track dark mode from <html> class attribute - \\
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"))

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"))
    })

    observer.observe(document.documentElement, {
      attributes     : true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  // - color values based on resolved theme - \\
  const baseColor     = isDark ? "#71717a" : "#a1a1aa"
  const gradientColor = isDark ? "#ffffff" : "#000000"

  return (
    <MotionComponent
      className={cn("relative inline-block [perspective:500px]", className)}
      style={{ color: baseColor }}
    >
      {children.split("").map((char, i) => {
        const delay = (i * duration * (1 / spread)) / children.length

        return (
          <motion.span
            key={`${char}-${i}-${isDark}`}
            className="inline-block whitespace-pre [transform-style:preserve-3d]"
            initial={{
              translateZ: 0,
              scale      : 1,
              rotateY    : 0,
              color      : baseColor,
            }}
            animate={{
              translateZ: [0, zDistance, 0],
              translateX: [0, xDistance, 0],
              translateY: [0, yDistance, 0],
              scale      : [1, scaleDistance, 1],
              rotateY    : [0, rotateYDistance, 0],
              color      : [baseColor, gradientColor, baseColor],
            }}
            transition={{
              duration,
              repeat     : Infinity,
              repeatDelay: (children.length * 0.05) / spread,
              delay,
              ease       : "easeInOut",
              ...transition,
            }}
          >
            {char}
          </motion.span>
        )
      })}
    </MotionComponent>
  )
}
