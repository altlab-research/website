import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPosts, getPostBySlug } from "@/lib/data";
import { Tag } from "@/components/Badge";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Blog
      </Link>

      <div className="mt-6 flex flex-wrap gap-2">
        {post.tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>

      <h1 className="mt-4 font-display text-3xl font-bold leading-tight md:text-4xl">
        {post.title}
      </h1>
      <p className="mt-3 text-sm text-muted">{formatDate(post.createdAt)}</p>

      <article className="prose prose-invert mt-10 max-w-none">
        {post.content.split("\n\n").map((p, i) => (
          <p key={i} className="mt-4 leading-relaxed text-ink/90">
            {p}
          </p>
        ))}
      </article>
    </div>
  );
}
