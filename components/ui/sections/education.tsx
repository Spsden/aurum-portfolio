import { CalendarDays, GraduationCap, MapPin } from "lucide-react";

import { EDUCATION } from "@/content/user-data";
import { Reveal, StaggerItem, StaggerWrapper } from "../enhancers/motion-utils";

export function Education() {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="max-w-7xl mx-auto py-8 sm:py-10 md:py-12 scroll-mt-24"
    >
      <Reveal>
        <div className="mb-5 sm:mb-6">
          <h2
            id="education-heading"
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-theme-fg"
          >
            Education
          </h2>
          <p className="mt-2 max-w-2xl text-sm sm:text-base text-theme-fg-400">
            My academic path across engineering and artificial intelligence.
          </p>
        </div>
      </Reveal>

      <StaggerWrapper className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {EDUCATION.map((education, index) => (
          <StaggerItem key={education.id} className="h-full">
            <article className="group relative h-full overflow-hidden rounded-2xl border border-theme-bg-300 bg-theme-bg-200 p-5 sm:p-6 md:p-8 shadow-theme-lg transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-theme-xl">
              <div
                aria-hidden="true"
                className="absolute -right-8 -top-8 h-28 w-28 rounded-full border border-theme-bg-300 bg-theme-bg-100 transition-transform duration-500 group-hover:scale-110"
              />

              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-theme-bg-300 bg-theme-bg-100 text-accent shadow-theme-sm">
                    <GraduationCap className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs text-theme-fg-500">
                    0{index + 1}
                  </span>
                </div>

                <div className="mt-6">
                  <span className="inline-flex rounded-full border border-accent/30 bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">
                    {education.status}
                  </span>
                  <h3 className="mt-4 text-lg sm:text-xl font-semibold text-theme-fg">
                    {education.degree}
                  </h3>
                  {education.field && (
                    <p className="mt-1 text-base sm:text-lg text-theme-fg-200">
                      {education.field}
                    </p>
                  )}
                  <p className="mt-3 text-sm sm:text-base font-medium text-theme-fg">
                    {education.institution}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-theme-fg-300">
                    {education.description}
                  </p>
                </div>

                <div className="mt-auto grid gap-2 border-t border-theme-bg-300 pt-5 sm:grid-cols-2">
                  <p className="flex items-center gap-2 text-xs sm:text-sm text-theme-fg-400">
                    <CalendarDays
                      className="h-4 w-4 shrink-0"
                      aria-hidden="true"
                    />
                    {education.period}
                  </p>
                  <p className="flex items-center gap-2 text-xs sm:text-sm text-theme-fg-400 sm:justify-end">
                    <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {education.location}
                  </p>
                </div>
              </div>
            </article>
          </StaggerItem>
        ))}
      </StaggerWrapper>
    </section>
  );
}
