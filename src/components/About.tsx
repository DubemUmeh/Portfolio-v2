"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, Handshake, Rocket, Trophy } from "lucide-react";
import { Card, CardContent } from "@/app/ui/card";
import { useRef } from "react";

const capabilityCards = [
  {
    eyebrow: <Trophy />,
    title: "Result First",
    body: "I focus on ROI, conversions, and performance, not just code.",
  },
  {
    eyebrow: <Handshake />,
    title: "Easy to work with",
    body: "Clear communication, regular updates, and no technical jargon.",
  },
  {
    eyebrow: <Rocket />,
    title: "On-Time Delivery",
    body: "I respect deadlines. Your project launches when we say it will.",
  },
  {
    eyebrow: <Code2 />,
    title: "Problem Solver",
    body: "I don't just build features; I solve business challenges.",
  },
] as const;

export default function About() {
  return (
    <section className="w-full h-full bg-transparent">

      {/* .landind-section .landind-section-tight .rounded-t-[3rem] */}
      <div className="landind-section landind-section-tight rounded-t-[3rem] relative px-5 pb-20 pt-4">

        {/* .landing-kicker-a */}
        <div className="landing-kicker-a relative left-4 md:left-10 top-15 md:top-10 inline-flex items-center gap-[0.45rem] border border-foreground/20 rounded-full bg-background/72 shadow-[0_8px_20px_rgba(15,23,42,0.05)] px-[0.8rem] py-[0.45rem] text-[0.95rem] font-semibold tracking-[0.12em] uppercase text-[#0a0a0a]">
          About Me
        </div>

        {/* .landing-container */}
        <div className="landing-container w-[min(100%,76rem)] mx-auto py-20">

          {/* .landing-feature-grid */}
          <div className="landing-feature-grid grid gap-6 items-stretch md:grid-cols-[minmax(0,1.1fr)_minmax(19rem,0.9fr)]">

            {/* .landing-feature-spotlight */}
            <article className="landing-feature-spotlight h-full min-h-136">

              {/* .landing-feature-window */}
              <div className="landing-feature-window relative h-full overflow-hidden border border-[rgba(10,10,10,0.08)] rounded-4xl bg-[radial-gradient(circle_at_top_left,rgba(255,205,112,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,184,142,0.2),transparent_36%),linear-gradient(180deg,#fffdf9_0%,#f5f1ea_100%)] shadow-[0_25px_65px_rgba(15,23,42,0.08),0_1px_0_rgba(255,255,255,0.75)_inset] p-4">

                {/* .landing-feature-toolbar */}
                <div className="landing-feature-toolbar flex gap-[0.45rem] pt-[0.2rem] pb-4">
                  {/* .landing-feature-toolbar span */}
                  <span className="w-[0.7rem] h-[0.7rem] rounded-full bg-[rgba(10,10,10,0.14)]" />
                  <span className="w-[0.7rem] h-[0.7rem] rounded-full bg-[rgba(10,10,10,0.14)]" />
                  <span className="w-[0.7rem] h-[0.7rem] rounded-full bg-[rgba(10,10,10,0.14)]" />
                </div>

                {/* .landing-feature-canvas */}
                <div className="landing-feature-canvas relative h-[calc(100%-1.8rem)] border border-[rgba(10,10,10,0.05)] rounded-[1.6rem] bg-[linear-gradient(rgba(255,255,255,0.52),rgba(255,255,255,0.52)),linear-gradient(to_right,rgba(10,10,10,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,10,10,0.03)_1px,transparent_1px)] bg-size-[100%_100%,34px_34px,34px_34px] p-[1.2rem] space-y-2 md:space-y-0">

                  {/* .landing-feature-card .landing-feature-card-a */}
                  <div className="landing-feature-card landing-feature-card-a sm:absolute grid gap-[0.45rem] w-full md:w-[min(18rem,52%)] border border-[rgba(10,10,10,0.09)] rounded-[1.35rem] bg-[rgba(255,255,255,0.86)] shadow-[0_18px_45px_rgba(15,23,42,0.08)] p-4 sm:top-[10%] sm:left-[8%] sm:rotate-[-7deg]">
                    {/* .landing-feature-chip */}
                    <span className="landing-feature-chip inline-flex justify-self-start rounded-full bg-[rgba(10,10,10,0.06)] px-[0.6rem] py-[0.32rem] text-[0.72rem] font-semibold tracking-[0.08em] uppercase text-[#737373]">
                      Experience
                    </span>
                    <strong className="text-base font-semibold text-[#0a0a0a]">
                      With over 3 years of XP
                    </strong>
                    <p className="m-0 text-[0.94rem] leading-[1.6] text-[#737373]">
                      I've learned that clean code is important, but{" "}
                      <span className="text-destructive font-semibold">
                        solving the right problem
                      </span>{" "}
                      is critical.
                    </p>
                  </div>

                  {/* .landing-feature-card .landing-feature-card-b */}
                  <div className="landing-feature-card landing-feature-card-b sm:absolute grid gap-[0.45rem] w-full md:w-[min(18rem,52%)] border border-[rgba(10,10,10,0.09)] rounded-[1.35rem] bg-[rgba(255,255,255,0.86)] shadow-[0_18px_45px_rgba(15,23,42,0.08)] p-4 sm:top-[34%] sm:right-[8%] sm:left-auto sm:rotate-[5deg]">
                    <span className="landing-feature-chip inline-flex justify-self-start rounded-full bg-[rgba(10,10,10,0.06)] px-[0.6rem] py-[0.32rem] text-[0.72rem] font-semibold tracking-[0.08em] uppercase text-[#737373]">
                      So why Me?
                    </span>
                    <strong className="text-base font-semibold text-[#0a0a0a]">
                      In a world full of developers
                    </strong>
                    <p className="m-0 text-[0.94rem] leading-[1.6] text-[#737373]">
                      It's simple: I care about your success.
                    </p>
                  </div>

                  {/* .landing-feature-card .landing-feature-card-c */}
                  <div className="landing-feature-card landing-feature-card-c sm:absolute grid gap-[0.45rem] w-full md:w-[min(18rem,52%)] border border-[rgba(10,10,10,0.09)] rounded-[1.35rem] bg-[rgba(255,255,255,0.86)] shadow-[0_18px_45px_rgba(15,23,42,0.08)] p-4 sm:left-[17%] sm:bottom-[10%] sm:-rotate-3">
                    <span className="landing-feature-chip inline-flex justify-self-start rounded-full bg-[rgba(10,10,10,0.06)] px-[0.6rem] py-[0.32rem] text-[0.72rem] font-semibold tracking-[0.08em] uppercase text-[#737373]">
                      The Process
                    </span>
                    <strong className="text-base font-semibold text-[#0a0a0a]">
                      Clear Communication
                    </strong>
                    <p className="m-0 text-[0.94rem] leading-[1.6] text-[#737373]">
                      From our first conversation to the final deployment, you'll
                      get honest feedback, and a partner who treats your project
                      like their own.
                    </p>
                  </div>

                </div>
              </div>
            </article>

            {/* .landing-feature-list */}
            <div className="landing-feature-list grid gap-4">
              {capabilityCards.map((feature) => (

                // .landing-copy-card
                <article
                  key={feature.title}
                  className="landing-copy-card border border-[rgba(10,10,10,0.08)] rounded-[1.6rem] bg-[rgba(255,255,255,0.72)] shadow-[0_18px_50px_rgba(15,23,42,0.05)] p-[1.35rem]"
                >
                  {/* .landing-kicker (icon variant) */}
                  <div className="landing-kicker inline-flex items-center gap-[0.45rem] border border-[rgba(10,10,10,0.1)] rounded-full bg-[rgba(255,255,255,0.72)] shadow-[0_8px_20px_rgba(15,23,42,0.05)] px-[0.8rem] py-[0.45rem] text-[0.75rem] font-semibold tracking-[0.12em] uppercase text-[#737373]">
                    {feature.eyebrow}
                  </div>

                  {/* .landing-copy-card h3 */}
                  <h3 className="mt-[0.9rem] mb-0 font-display text-[1.3rem] leading-[1.15] tracking-[-0.03em] text-[#0a0a0a] font-semibold">
                    {feature.title}
                  </h3>

                  {/* .landing-copy-card p */}
                  <p className="mt-[0.8rem] mb-0 text-[#737373] leading-[1.68]">
                    {feature.body}
                  </p>
                </article>

              ))}
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}