import Navbar from "@/components/ui/sections/navbar";
import Footer from "@/components/ui/sections/footer";
import BlogCard from "@/components/helpers/blog-card";
import { PageContainer } from "@/app/page";
import { getAllPosts } from "@/lib/blogs";
import {
  Reveal,
  StaggerWrapper,
  StaggerItem,
} from "@/components/ui/enhancers/motion-utils";

export default async function BlogsPage() {
  const posts = await getAllPosts();

  return (
    <>
      <Navbar />
      <PageContainer>
        <section className="py-8 sm:py-12 md:py-16">
          <Reveal>
            <header className="mb-8 sm:mb-10">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-theme-fg">
                Blogs
              </h1>
              <p className="mt-2 text-sm sm:text-base text-theme-fg-400 max-w-xl">
                Thoughts on backend engineering, distributed systems,
                infrastructure, culture and whatever I learn.
              </p>
            </header>
          </Reveal>

          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-theme-fg-400 text-sm">
                No blogs published yet. Check back soon.
              </p>
            </div>
          ) : (
            <StaggerWrapper className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {posts.map((post) => (
                <StaggerItem key={post.slug}>
                  <BlogCard blog={post} />
                </StaggerItem>
              ))}
            </StaggerWrapper>
          )}
        </section>
      </PageContainer>
      <Footer />
    </>
  );
}
