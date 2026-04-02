"use client"

// - fade-in scroll reveal wrapper using intersection observer - \\

import { useEffect, useRef, useState } from "react"

interface FadeInProps {
  children  : React.ReactNode
  className?: string
  delay?    : number   // delay in ms
  direction?: "up" | "down" | "left" | "right" | "none"
}

/**
 * @description Wraps children with a fade-in animation triggered on scroll into view
 * @param children  content to animate
 * @param className optional extra classes
 * @param delay     animation delay in ms (default 0)
 * @param direction translate direction before fade-in (default "up")
 * @returns wrapped animated element
 */
export const FadeIn = ({
  children,
  className = "",
  delay     = 0,
  direction = "up",
}: FadeInProps) => {
  const ref     = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // - initial transform based on direction - \\
  const translate = {
    up   : "translate-y-6",
    down : "-translate-y-6",
    left : "translate-x-6",
    right: "-translate-x-6",
    none : "",
  }[direction]

  return (
    <div
      ref={ref}
      className={[
        "transition-all duration-700 ease-out",
        visible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${translate}`,
        className,
      ].join(" ")}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
