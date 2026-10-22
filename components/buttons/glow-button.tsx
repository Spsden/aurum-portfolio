import { USER_DATA } from "@/content/user-data";
import { AppProps } from "next/app";

interface GlowButtonArgs {
  text: string;
}

export const GlowButton = (args: GlowButtonArgs) => {
  return (
    <div className="relative inline-flex items-center justify-center gap-4  group">
      <div className="absolute inset-0 duration-1000 opacity-60 transitiona-all bg-gradient-to-r from-teal-400 via-emerald-500 to-amber-300 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"></div>
      <a
        role="button"
        className="group relative inline-flex items-center justify-center text-sm sm:text-base md:text-lg rounded-xl bg-accent px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 font-semibold text-accent-contrast transition-all duration-200 hover:bg-accent-hover hover:shadow-lg hover:-translate-y-0.5 hover:shadow-teal-900/30"
        title="Download resume"
        href={USER_DATA.resume}
      >
        {args.text}
        <svg
          aria-hidden="true"
          viewBox="0 0 10 10"
          height="10"
          width="10"
          fill="none"
          className="mt-0.5 ml-2 -mr-1 stroke-white stroke-2"
        >
          <path
            d="M0 5h7"
            className="transition opacity-0 group-hover:opacity-100"
          ></path>
          <path
            d="M1 1l4 4-4 4"
            className="transition group-hover:translate-x-[3px]"
          ></path>
        </svg>
      </a>
    </div>
  );
};
