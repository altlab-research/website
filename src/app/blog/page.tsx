import { SectionLabel } from "@/components/Badge";
import BlogCard from "@/components/BlogCard";
import { getPosts } from "@/lib/data";

export const metadata = { title: "Blog — AltLab" };

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
      <SectionLabel>Blog</SectionLabel>
      <h1 className="font-display text-3xl font-bold md:text-4xl">Notes from the lab</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Engineering write-ups, design decisions, and lessons learned while
        building AltLab's research infrastructure.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
