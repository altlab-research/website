import Link from "next/link";
import type { Post } from "@/types";
import { Tag } from "./Badge";
import { formatDate } from "@/lib/utils";

export default function BlogCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="card-surface group block overflow-hidden rounded-xl transition-all hover:-translate-y-1">
      <div className="flex h-36 items-center justify-center bg-gradient-to-br from-primary/15 to-secondary/15">
        <span className="font-display text-2xl font-bold text-primary/40">AltLab</span>
      </div>
      <div className="p-5">
        <p className="text-xs text-muted">{formatDate(post.createdAt)}</p>
        <h3 className="mt-1.5 font-display text-base font-semibold leading-snug group-hover:text-primary">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{post.excerpt}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>
    </Link>
  );
}
