"use client";

import Image                                          from "next/image";
import Link                                           from "next/link";
import * as React                                     from "react";
import { useEffect, useState }                        from "react";
import { X, Bot, Globe, Server, Layers, BarChart3 }   from "lucide-react";
import { Button }                                     from "@/components/ui/button";
import { Badge }                                      from "@/components/ui/badge";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
}                                                     from "@/components/animate-ui/primitives/headless/dialog";

// - ─────────────────────────────────────── - \\

interface TechItem {
  name: string;
  role: string;
}

interface BotDetail {
  name: string;
  purpose: string;
  features: string[];
}

interface PageDetail {
  name: string;
  description: string;
}

interface ProjectDetail {
  headline: string;
  summary: string;
  bots?: BotDetail[];
  pages?: PageDetail[];
  tech_stack: TechItem[];
  architecture_notes: string[];
  stats: Record<string, string>;
}

interface FeatureWorkItem {
  title: string;
  description: string;
  roles: string[];
  image: string;
  detail?: ProjectDetail;
}

// - ─────────────────────────────────────── - \\

function ProjectDetailContent({ item }: { item: FeatureWorkItem }) {
  const detail = item.detail;
  if (!detail) return null;

  return (
    <div className="flex flex-col gap-6">
      {/* header */}
      <DialogHeader>
        <DialogTitle>{item.title}</DialogTitle>
        <DialogDescription>{detail.headline}</DialogDescription>
      </DialogHeader>

      {/* project image */}
      <div className="overflow-hidden rounded-lg border border-border">
        <Image
          src={item.image}
          alt={item.title}
          width={600}
          height={368}
          sizes="(max-width: 672px) 100vw, 600px"
          style={{ width: "100%", height: "auto" }}
          className="object-cover"
        />
      </div>

      {/* summary */}
      <p className="text-sm leading-relaxed">{detail.summary}</p>

      {/* stats badges */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(detail.stats).map(([key, value]) => (
          <Badge key={key} variant="outline" className="gap-1.5 px-3 py-1.5">
            <BarChart3 className="size-3" />
            <span className="capitalize">{key.replace(/_/g, " ")}:</span>{" "}
            <span className="font-semibold">{value}</span>
          </Badge>
        ))}
      </div>

      {/* tech stack */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Layers className="size-4 text-primary" />
          <h5 className="!text-base font-semibold">Tech Stack</h5>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {detail.tech_stack.map((tech) => (
            <div key={tech.name} className="flex flex-col gap-0.5 rounded-lg bg-muted/50 p-3">
              <span className="text-sm font-medium text-primary">{tech.name}</span>
              <span className="text-xs text-muted-foreground">{tech.role}</span>
            </div>
          ))}
        </div>
      </div>

      {/* bots (atomic_bot project) */}
      {detail.bots && detail.bots.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Bot className="size-4 text-primary" />
            <h5 className="!text-base font-semibold">Bot Breakdown</h5>
          </div>
          {detail.bots.map((bot) => (
            <div key={bot.name} className="flex flex-col gap-2 rounded-lg border border-border p-4">
              <div className="flex items-center gap-2">
                <Server className="size-3.5 text-muted-foreground" />
                <span className="text-sm font-semibold text-primary">{bot.name}</span>
                <span className="text-xs text-muted-foreground">— {bot.purpose}</span>
              </div>
              <ul className="flex flex-col gap-1.5 pl-5">
                {bot.features.map((feat, i) => (
                  <li key={i} className="text-xs text-muted-foreground list-disc leading-relaxed">{feat}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* pages (dashboard project) */}
      {detail.pages && detail.pages.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Globe className="size-4 text-primary" />
            <h5 className="!text-base font-semibold">Dashboard Pages</h5>
          </div>
          {detail.pages.map((page) => (
            <div key={page.name} className="flex flex-col gap-1 rounded-lg border border-border p-4">
              <span className="text-sm font-semibold text-primary">{page.name}</span>
              <span className="text-xs text-muted-foreground leading-relaxed">{page.description}</span>
            </div>
          ))}
        </div>
      )}

      {/* architecture notes */}
      <div className="flex flex-col gap-3">
        <h5 className="!text-base font-semibold">Architecture</h5>
        <ul className="flex flex-col gap-1.5 pl-5">
          {detail.architecture_notes.map((note, i) => (
            <li key={i} className="text-xs text-muted-foreground list-disc leading-relaxed">{note}</li>
          ))}
        </ul>
      </div>

      {/* close button (bottom) */}
      <DialogFooter>
        <DialogClose className="inline-flex">
          <Button variant="outline" className="h-auto py-2.5 px-5 pointer-events-none">
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </div>
  );
}

// - ─────────────────────────────────────── - \\

const FeaturedWork = () => {
  const [featureWork, setFeatureWork] = useState<FeatureWorkItem[] | null>(null);
  const [active_index, set_active_index] = React.useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/featured-work");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setFeatureWork(data?.featureWork);
      } catch (error) {
        console.error("Error fetching featured work:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <div className="container">
        <div className="border-x border-border">
          <div className="flex flex-col max-w-3xl mx-auto py-10 px-4 sm:px-7">
            <div className="flex flex-col xs:flex-row gap-5 items-center justify-between">
              <p className="text-sm tracking-[2px] text-primary uppercase font-medium">
                Featured work
              </p>
              <Button
                variant={"outline"}
                className="h-auto py-3 px-5"
                nativeButton={false}
                render={<Link href={"/"}>Download Portfolio</Link>}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-border">
            {featureWork?.map((value, index) => {
              const isRightCol = index % 2 === 1;
              const is_open    = active_index === index;

              return (
                <React.Fragment key={index}>
                  <div
                    className={`group flex flex-col gap-3.5 sm:gap-5 p-3.5 sm:p-6 ${isRightCol ? "md:border-l md:border-border" : ""}`}
                  >
                    <button
                      onClick={() => set_active_index(index)}
                      className="block overflow-hidden cursor-pointer text-left"
                    >
                      <Image
                        src={value?.image}
                        alt={value?.title || "Image"}
                        width={490}
                        height={300}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        loading={index === 0 ? "eager" : "lazy"}
                        style={{ width: "100%", height: "auto" }}
                        className="group-hover:scale-105 transition-all duration-300 ease-in-out"
                      />
                    </button>
                    <div className="flex flex-col gap-1 sm:gap-2 px-2">
                      <button
                        onClick={() => set_active_index(index)}
                        className="cursor-pointer text-left"
                      >
                        <h4>{value?.title}</h4>
                      </button>
                      <div className="flex">
                        <p>{value?.roles?.join(", ")}</p>
                      </div>
                    </div>
                  </div>

                  <Dialog
                    open={is_open}
                    onClose={() => set_active_index(null)}
                  >
                    <DialogBackdrop className="fixed inset-0 z-40 bg-black/80" />
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                      <DialogPanel
                        from="bottom"
                        className="relative w-full max-w-2xl max-h-[85vh] border bg-background rounded-xl p-6 shadow-xl overflow-y-auto"
                      >
                        <DialogClose className="absolute top-4 right-4 opacity-70 hover:opacity-100 transition-opacity">
                          <X className="size-4" />
                          <span className="sr-only">Close</span>
                        </DialogClose>
                        <ProjectDetailContent item={value} />
                      </DialogPanel>
                    </div>
                  </Dialog>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
