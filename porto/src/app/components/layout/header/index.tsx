"use client"

import { useEffect, useState } from "react"
import AnnouncementBar        from "./announcementBar"

const Header = () => {
    const [dark, setDark] = useState(false)

    useEffect(() => {
        const stored = localStorage.getItem("theme")
        const prefer  = window.matchMedia("(prefers-color-scheme: dark)").matches
        const isDark  = stored === "dark" || (!stored && prefer)
        setDark(isDark)
        document.documentElement.classList.toggle("dark", isDark)
    }, [])

    const toggle = () => {
        const next = !dark
        setDark(next)
        document.documentElement.classList.toggle("dark", next)
        localStorage.setItem("theme", next ? "dark" : "light")
    }

    return (
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
            <AnnouncementBar/>
            <div className="container">
                <div className="flex items-center justify-end h-10">
                    <button
                        onClick={toggle}
                        aria-label="Toggle dark mode"
                        className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                        {dark ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="4"/>
                                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header