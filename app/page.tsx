import { ReactNode } from "react";
import HeroSection from "@/components/ui/sections/hero";
import Navbar from "@/components/ui/sections/navbar";
import { Experience } from "@/components/ui/sections/experience";
import ProjectsGrid from "@/components/ui/sections/project";
// import BlogPreview from "@/components/ui/sections/blog-preview";
import Footer from "@/components/ui/sections/footer";
import { Education } from "@/components/ui/sections/education";
import { Achievements } from "@/components/ui/sections/achievements";
import { PROJECTS } from "@/content/user-data";
// import { getAllPosts } from "@/lib/blogs";

type Props = {
  children?: ReactNode;
  className?: string;
};

export function PageContainer({ children, className = "" }: Props) {
  return (
    <div className={`w-full ${className}`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {children}
      </div>
    </div>
  );
}

export default async function Home() {
  // Blogs section removed — re-enable together with the BlogPreview import.
  // const posts = await getAllPosts();

  return (
    <>
      <Navbar />

      <PageContainer>
        <HeroSection />
        <Experience />
        <Education />
        <Achievements />
        <ProjectsGrid projects={PROJECTS} />
        {/* Blog section removed — re-enable together with the import above. */}
        {/* <BlogPreview posts={posts} /> */}
      </PageContainer>
      <Footer />
    </>
  );
}
