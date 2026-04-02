import Image  from "next/image"
import { Badge } from "@/components/ui/badge";

// - language definitions with devicon CDN icons - \\
const languages = [
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Java",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Python",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Luau",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg" },
];

const AboutMe = () => {
  const servicesBedge = [
    "TypeScript",
    "Node.js",
    "Next.js",
    "React",
    "PostgreSQL",
    "discord.js",
    "REST API Design",
    "Tailwind CSS",
    "Railway / Vercel",
    "Git & GitHub",
    "UI/UX Design",
    "shadcn/ui",
  ];
  return (
    <section>
      <div className="container">
        <div className="relative border-x border-border overflow-hidden">
          <Image
            src="/images/about-me/about-me-bg.svg"
            alt=""
            fill
            loading="eager"
            className="object-cover object-center dark:hidden pointer-events-none select-none"
            aria-hidden="true"
          />
          <div className="relative z-10 flex flex-col gap-9 sm:gap-12 max-w-3xl mx-auto px-4 sm:px-7 py-11 md:py-20">
            <div className="flex flex-col gap-4">
              <p className="text-sm tracking-[2px] text-primary uppercase font-medium">
                About Me
              </p>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px]">
                Hey, I'm Rian — a developer from Bandung, currently having a
                blast{" "}
                <span className="bg-[linear-gradient(90deg,rgba(243,202,77,0.4)_0%,rgba(243,202,77,0.05)_100%)]">
                  building atomic_bot
                </span>{" "}
                — a Discord bot platform for server management, ticketing &amp; JKT48 live notifications.
              </h2>
              <h5 className="text-secondary font-normal">
                Really into TypeScript, real-time systems, and keeping things clean &amp; well-structured.
              </h5>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                Languages I use
              </p>
              <div className="flex flex-wrap gap-3">
                {languages.map((lang, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-border bg-card hover:bg-primary/5 transition-colors duration-200"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={lang.icon} alt={lang.name} width={20} height={20} className="w-5 h-5" />
                    <span className="text-sm font-medium">{lang.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-sm text-primary uppercase font-medium">
                Services
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {servicesBedge?.map((value, index) => {
                  return (
                    <Badge
                      variant={"outline"}
                      key={index}
                      className="py-1.5 px-3 rounded-lg h-full"
                    >
                      <p className="text-xs sm:text-sm font-medium text-primary">
                        {value}
                      </p>
                    </Badge>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
