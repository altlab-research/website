import { notFound } from "next/navigation";
import Link from "next/link";
import { FileDown, Github, GitBranch, ArrowLeft } from "lucide-react";
import { getPapers, getPaperBySlug } from "@/lib/data";
import { Tag } from "@/components/Badge";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const papers = await getPapers();
  return papers.map((p) => ({ slug: p.slug }));
}

export default async function PaperPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const paper = await getPaperBySlug(slug);
  if (!paper) notFound();

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
      <Link href="/research" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Research
      </Link>

      <div className="mt-6 flex flex-wrap gap-2">
        {paper.tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>

      <h1 className="mt-4 font-display text-3xl font-bold leading-tight md:text-4xl">
        {paper.title}
      </h1>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
        <span>{paper.authors.join(", ")}</span>
        <span>&middot;</span>
        <span>{formatDate(paper.publishedAt)}</span>
        <span>&middot;</span>
        <span>{paper.citations} citations</span>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {paper.pdfUrl && (
          <a href={paper.pdfUrl} className="inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-4 py-2 text-sm font-semibold text-white">
            <FileDown className="h-4 w-4" /> Download PDF
          </a>
        )}
        {paper.githubUrl && (
          <a href={paper.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:border-primary/50">
            <Github className="h-4 w-4" /> GitHub
          </a>
        )}
        {paper.architectureUrl && (
          <a href={paper.architectureUrl} className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:border-primary/50">
            <GitBranch className="h-4 w-4" /> Architecture
          </a>
        )}
      </div>

      <div className="card-surface mt-8 rounded-xl p-6">
        <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-muted">
          Abstract
        </h2>
        <p className="mt-3 leading-relaxed text-ink/90">{paper.abstract}</p>
      </div>

      {paper.content && (
        <article className="prose prose-invert mt-10 max-w-none prose-headings:font-display prose-headings:font-semibold prose-a:text-primary">
          {paper.content.split("\n\n").map((block, i) => {
            if (block.startsWith("## ")) {
              return (
                <h2 key={i} className="mt-8 font-display text-xl font-semibold">
                  {block.replace("## ", "")}
                </h2>
              );
            }
            if (block.match(/^- /m)) {
              return (
                <ul key={i} className="mt-3 list-disc space-y-1.5 pl-5 text-muted">
                  {block.split("\n").map((line, j) => (
                    <li key={j}>{line.replace(/^- /, "")}</li>
                  ))}
                </ul>
              );
            }
            if (block.match(/^\d\. /m)) {
              return (
                <ol key={i} className="mt-3 list-decimal space-y-1.5 pl-5 text-muted">
                  {block.split("\n").map((line, j) => (
                    <li key={j}>{line.replace(/^\d\.\s/, "")}</li>
                  ))}
                </ol>
              );
            }
            return (
              <p key={i} className="mt-3 leading-relaxed text-muted">
                {block}
              </p>
            );
          })}
        </article>
      )}
    </div>
  );
}
