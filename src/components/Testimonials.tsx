"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/app/ui/avatar";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  return (
    <section className="landing-section relative px-5 pb-20">

      {/* .landing-container */}
      <div className="landing-container w-[min(100%,76rem)] mx-auto">

        {/* .landing-process-shell */}
        <div className="landing-process-shell overflow-hidden rounded-[2.4rem] bg-[radial-gradient(circle_at_top_left,rgba(246,213,247,0.34),transparent_28%),radial-gradient(circle_at_86%_18%,rgba(255,225,147,0.16),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,184,142,0.14),transparent_26%),linear-gradient(180deg,#fbfaf8_0%,#f4f1ee_100%)] border border-[rgba(10,10,10,0.06)] shadow-[0_24px_60px_rgba(15,23,42,0.06),0_1px_0_rgba(255,255,255,0.72)_inset] p-6">

          {/* .landing-process-header Mobile:  single column Desktop: two columns, header left / subtext right */}
          <div className="landing-process-header grid gap-4 items-end mb-6 md:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.7fr)]">
            <div>
              {/* .landing-kicker .landing-kicker-inverse */}
              <div className="landing-kicker landing-kicker-inverse inline-flex items-center gap-[0.45rem] border border-[rgba(143,137,143,0.28)] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(249,239,250,0.72)),rgba(255,255,255,0.72)] shadow-[0_8px_20px_rgba(246,213,247,0.1),0_1px_0_rgba(255,255,255,0.72)_inset] px-[0.8rem] py-[0.45rem] text-[0.76rem] font-semibold tracking-[0.12em] uppercase text-[#7a6679]">
                Testimonials
              </div>

              {/* .display-title .landing-process-title */}
              <h2 className="display-title landing-process-title mt-4 text-[clamp(2rem,5vw,3.6rem)] leading-none tracking-[-0.04em] text-[#0a0a0a] font-['Fraunces',Georgia,serif] [font-optical-sizing:auto]">
                What clients say about working with me.
              </h2>
            </div>
            {/* .landing-process-header p */}
            <p className="mt-4 text-[1.05rem] leading-[1.72] text-[#525252]">
              Real feedback from people I've worked with — on projects big and
              small, across different industries and challenges.
            </p>
          </div>

          {/* .landing-process-grid Mobile:  single column Desktop: 3 columns */}
          <div className="landing-process-grid grid gap-4 md:grid-cols-3">
            {testimonials.map((testimonial) => (

              // {/* .landing-process-card */}
              <article
                key={testimonial.id}
                className="landing-process-card border border-[rgba(10,10,10,0.07)] rounded-3xl bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(255,255,255,0.7)),rgba(255,255,255,0.76)] shadow-[0_12px_30px_rgba(15,23,42,0.04),0_1px_0_rgba(255,255,255,0.72)_inset] p-5"
              >
                {/* Quote text */}
                <p className="mt-0 mb-0 leading-[1.65] text-[#525252] text-[0.95rem]">
                  "{testimonial.content}"
                </p>

                {/* Attribution */}
                <div className="flex items-center gap-3 mt-5 pt-5 border-t border-[rgba(10,10,10,0.07)]">
                  <Avatar className="w-9 h-9 shrink-0">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback className="text-xs font-semibold bg-[rgba(10,10,10,0.06)] text-[#737373]">
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    {/* .landing-process-card strong — name */}
                    <div className="text-[0.9rem] font-semibold tracking-[-0.01em] text-[#0a0a0a]">
                      {testimonial.name}
                    </div>
                    {/* .landing-process-card span — role */}
                    <span className="inline-flex text-[0.82rem] font-semibold tracking-[0.14em] uppercase text-[#9d7c78]">
                      {testimonial.role}
                    </span>
                  </div>
                </div>
              </article>

            ))}
          </div>

        </div>
      </div>
    </section>
  );
}