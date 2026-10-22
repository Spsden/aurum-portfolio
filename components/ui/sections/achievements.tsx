import { Trophy } from "lucide-react";

import { ACHIEVEMENTS } from "@/content/user-data";
import { Reveal, StaggerItem, StaggerWrapper } from "../enhancers/motion-utils";

export function Achievements() {
  return (
    <section aria-labelledby="achievements-heading" className="py-8 sm:py-10 md:py-12">
      <Reveal>
        <div className="mb-5 sm:mb-6">
          <h2
            id="achievements-heading"
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-theme-fg"
          >
            Achievements &amp; Leadership
          </h2>
        </div>
      </Reveal>

      <StaggerWrapper className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {ACHIEVEMENTS.map((item) => (
          <StaggerItem key={item.title} className="h-full">
            <article className="group relative h-full overflow-hidden rounded-2xl border border-theme-bg-300 bg-theme-bg-200 p-5 sm:p-6 shadow-theme-lg transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-theme-xl">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Trophy className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-theme-fg">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-theme-fg-300">
                {item.body}
              </p>
            </article>
          </StaggerItem>
        ))}
      </StaggerWrapper>
    </section>
  );
}
