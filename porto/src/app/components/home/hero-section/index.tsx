"use client"

// - hero section with next-themes toggler and updated social links - \

import Image         from "next/image";
import Link          from "next/link";
import { useTheme }  from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { Button }    from "@/components/ui/button";
import {
  ThemeToggler,
  type ThemeSelection,
  type Resolved,
} from "@/components/animate-ui/primitives/effects/theme-toggler";

// - social link definitions (Twitter, Discord, Instagram) - \
const socialIcon = [
  {
    href : "https://twitter.com/rianfebriansy",
    label: "Twitter",
    icon : (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"/>
      </svg>
    ),
  },
  {
    href : "https://discord.gg/atomicals",
    label: "Discord",
    // eslint-disable-next-line @next/next/no-img-element
    icon : <img src="https://cdn.simpleicons.org/discord" alt="Discord" width={18} height={18} className="w-[18px] h-[18px] dark:invert" />,
  },
  {
    href : "https://instagram.com/_.matchapancake",
    label: "Instagram",
    icon : (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069Zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z"/>
      </svg>
    ),
  },
];

const HeroSection = () => {
  const { theme, resolvedTheme, setTheme } = useTheme()

  return (
    <section className="relative">
      <ThemeToggler
        theme={theme as ThemeSelection}
        resolvedTheme={resolvedTheme as Resolved}
        setTheme={setTheme}
        direction="ltr"
      >
        {({ effective, toggleTheme }) => {
          const nextTheme =
            effective === "dark"
              ? "light"
              : effective === "system"
                ? "dark"
                : "system"

          return (
            <button
              onClick={() => toggleTheme(nextTheme)}
              aria-label="Toggle theme"
              className="absolute top-4 right-6 z-10 w-8 h-8 rounded-full flex items-center justify-center bg-background/70 backdrop-blur-sm border border-border text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {effective === "system" ? (
                <Monitor size={15}/>
              ) : effective === "dark" ? (
                <Moon size={15}/>
              ) : (
                <Sun size={15}/>
              )}
            </button>
          )
        }}
      </ThemeToggler>

      <div className="container">
        <div className="">
          <div className="w-full h-72">
            <Image
              src={"/images/hero-sec/cat.gif"}
              alt="banner-img"
              width={1080}
              height={267}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="border-x border-border">
            <div className="relative flex flex-col xs:flex-row items-center xs:items-start justify-center xs:justify-between max-w-3xl mx-auto gap-10 xs:gap-3 px-4 sm:px-7 pt-22 pb-8 sm:pb-12">
              <div className="absolute top-0 transform -translate-y-1/2">
                <Image
                  src={"/images/hero-sec/user-profile.png"}
                  alt="user-profile"
                  width={145}
                  height={145}
                  className="border-4 border-background rounded-full"
                />
                <span className="absolute bottom-2.5 right-5 w-4 h-4 bg-green-500 border-2 border-background rounded-full" />
              </div>
              <div className="flex flex-col gap-2 sm:gap-3 items-center text-center xs:items-start">
                <h1>Rian Febriansyah</h1>
                <p className="text-violet-700 font-normal whitespace-nowrap">
                  Full Stack Developer &amp; Discord Bot Engineer &middot; 15 y/o
                </p>
                <div className="flex items-center gap-2">
                  <Image
                    src={"/images/icon/map-icon.svg"}
                    alt="map-icon"
                    width={20}
                    height={20}
                    className="dark:invert"
                  />
                  <p className="text-primary">Bandung, Indonesia</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex items-center gap-2">
                  {socialIcon.map((value, index) => (
                    <Link
                      href={value.href}
                      key={index}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-fit p-2.5 sm:p-3.5 hover:bg-primary/5 border border-border rounded-full text-foreground"
                    >
                      {value.icon}
                    </Link>
                  ))}
                </div>
                <Button className="h-auto rounded-full p-0">
                  <Link
                    href="https://discord.gg/atomicals"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block p-0.5 rounded-full bg-[linear-gradient(96.09deg,_#9282F8_12.17%,_#F3CA4D_90.71%)]"
                  >
                    <span className="flex items-center gap-3 bg-primary hover:bg-[linear-gradient(96.09deg,_#9282F8_12.17%,_#F3CA4D_90.71%)] py-2.5 px-5 rounded-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://cdn.simpleicons.org/discord/ffffff" alt="Discord" width={14} height={14} className="w-[14px] h-[14px]" />
                      <span className="text-sm sm:text-base font-semibold text-primary-foreground">
                        Join Discord
                      </span>
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
