"use client"

// - theme toggler primitive with animation support - \\

import { useEffect, useRef } from "react"

export type ThemeSelection = "light" | "dark" | "system"
export type Resolved       = "light" | "dark"
export type Direction      = "ltr" | "rtl"

interface RenderProps {
  effective    : Resolved | "system"
  toggleTheme  : (next: ThemeSelection) => void
}

interface ThemeTogglerProps {
  theme        : ThemeSelection
  resolvedTheme: Resolved
  setTheme     : (theme: string) => void
  direction?   : Direction
  children     : (props: RenderProps) => React.ReactNode
}

/**
 * @description Primitive wrapper for animated theme toggling
 * @param theme         current selected theme (light/dark/system)
 * @param resolvedTheme resolved effective theme
 * @param setTheme      function to set the theme
 * @param children      render prop receiving effective & toggleTheme
 * @returns rendered children with theme context
 */
export const ThemeToggler = ({
  theme,
  resolvedTheme,
  setTheme,
  children,
}: ThemeTogglerProps) => {
  const effective = theme === "system" ? "system" : (resolvedTheme ?? theme)

  const toggleTheme = (next: ThemeSelection) => {
    setTheme(next)
  }

  return <>{children({ effective, toggleTheme })}</>
}
