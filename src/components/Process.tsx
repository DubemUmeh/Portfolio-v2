"use client";

import { MessageSquare, Lightbulb, PenTool, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    eyebrow: "1. Discovery",
    title: "We start with your goals, not code.",
    body: "We dive deep into your business goals, target audience, and current challenges. No code is written until we know exactly what success looks like.",
  },
  {
    icon: Lightbulb,
    eyebrow: "2. Strategy",
    title: "A clear roadmap before we build.",
    body: "I create a roadmap and technical architecture. You'll see exactly how we'll solve your problem before a single line is written.",
  },
  {
    icon: PenTool,
    eyebrow: "3. Development",
    title: "Modern, scalable, transparent builds.",
    body: "I build your solution using modern, scalable tech. You get regular updates and can see progress in real-time throughout.",
  },
  {
    icon: Rocket,
    eyebrow: "4. Launch",
    title: "We ship — and I stay.",
    body: "We test everything rigorously, then launch. I don't just disappear; I make sure your system runs smoothly after go-live.",
  },
] as const;

export default function Process() {
  return (
    <section className="landing-section relative px-5 pb-20">

      {/* .landing-container */}
      <div className="landing-container w-[min(100%,76rem)] mx-auto">

        {/* .landing-ai-shell */}
        <div className="landing-ai-shell relative border border-[rgba(10,10,10,0.07)] rounded-4xl bg-[radial-gradient(circle_at_top_left,rgba(246,213,247,0.16),transparent_24%),radial-gradient(circle_at_88%_14%,rgba(255,225,147,0.12),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,255,255,0.68))] shadow-[0_20px_48px_rgba(15,23,42,0.05),0_1px_0_rgba(255,255,255,0.74)_inset] p-6
          before:content-[''] before:absolute before:inset-x-[-0.8rem] before:top-[-1.2rem] before:h-56 before:rounded-full before:bg-[radial-gradient(circle_at_24%_48%,rgba(246,213,247,0.55),transparent_42%),radial-gradient(circle_at_78%_38%,rgba(255,225,147,0.38),transparent_36%),radial-gradient(circle_at_62%_72%,rgba(255,184,142,0.26),transparent_34%)] before:blur-[42px] before:opacity-[0.72] before:pointer-events-none before:z-0
          *:relative *:z-1">

          {/* .landing-ai-header */}
          <div className="landing-ai-header max-w-2xl mb-6">

            {/* .landing-kicker */}
            <div className="landing-kicker inline-flex items-center gap-2 border border-[rgba(10,10,10,0.1)] rounded-full bg-[rgba(255,255,255,0.72)] shadow-[0_8px_20px_rgba(15,23,42,0.05)] px-[0.8rem] py-[0.45rem] text-[0.76rem] font-semibold tracking-[0.12em] uppercase text-[#737373]">
              My Process
            </div>

            {/* .display-title .landing-section-title */}
            <h2 className="display-title landing-section-title mt-4 text-[clamp(2rem,5vw,3.6rem)] leading-none tracking-[-0.04em] text-[#0a0a0a] font-['Fraunces',Georgia,serif] [font-optical-sizing:auto]">
              How I deliver predictable results.
            </h2>

            {/* .landing-section-copy */}
            <p className="landing-section-copy mt-4 text-[1.05rem] leading-[1.72] text-[#525252]">
              Every engagement follows the same four-phase process — so you always
              know where we are, what's coming next, and exactly what success
              looks like before we build it.
            </p>
          </div>

          {/* .landing-ai-grid — single column on mobile, 2×2 step grid on desktop */}
          <div className="landing-ai-grid grid gap-4 md:grid-cols-2">

            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <article
                  key={step.title}
                  className="landing-ai-card border border-[rgba(10,10,10,0.07)] rounded-[1.35rem] bg-[rgba(255,255,255,0.76)] shadow-[0_12px_28px_rgba(15,23,42,0.04)] p-[1.1rem]"
                >
                  {/* .landing-kicker — eyebrow with step number + icon */}
                  <div className="landing-kicker inline-flex items-center gap-[0.45rem] border border-[rgba(10,10,10,0.1)] rounded-full bg-[rgba(255,255,255,0.72)] shadow-[0_8px_20px_rgba(15,23,42,0.05)] px-[0.8rem] py-[0.45rem] text-[0.76rem] font-semibold tracking-[0.12em] uppercase text-[#737373]">
                    <Icon size={12} strokeWidth={2} />
                    {step.eyebrow}
                  </div>

                  {/* .landing-ai-card h3 */}
                  <h3 className="mt-[0.9rem] mb-0 text-[1.15rem] leading-[1.15] tracking-[-0.03em] text-[#0a0a0a] font-semibold">
                    {step.title}
                  </h3>

                  {/* .landing-ai-card p */}
                  <p className="mt-3 mb-0 leading-[1.65] text-[#525252]">
                    {step.body}
                  </p>
                </article>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
}