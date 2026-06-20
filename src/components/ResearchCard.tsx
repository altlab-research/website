import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Paper } from "@/types";
import { Tag } from "./Badge";
import { formatDate } from "@/lib/utils";

export default function ResearchCard({ paper }: { paper: Paper }) {
  return (
    <Link
      href={`/research/${paper.slug}`}
      className="card-surface group block rounded-xl p-5 transition-all hover:-translate-y-0.5 md:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-display text-base font-semibold text-ink md:text-lg">
            {paper.title}
          </h3>
          <p className="mt-1 text-xs text-muted">
            {formatDate(paper.publishedAt)} &middot; {paper.tags.join(", ")}
          </p>
          <p className="mt-3 line-clamp-2 text-sm text-muted">{paper.abstract}</p>
        </div>
        <ArrowRight className="mt-1 h-4 w-4 flex-shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-primary" />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {paper.tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
    </Link>
  );
}
