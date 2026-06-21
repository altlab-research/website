import Link from "next/link";
import { SectionLabel, Tag } from "@/components/Badge";
import { getPapers } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export const metadata = { title: "Publications — AltLab" };

export default async function PublicationsPage() {
  const papers = await getPapers();

  const byYear = papers.reduce<Record<string, typeof papers>>((acc, p) => {
    const year = new Date(p.publishedAt).getFullYear().toString();
    acc[year] = acc[year] || [];
    acc[year].push(p);
    return acc;
  }, {});

  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
      <SectionLabel>Publications</SectionLabel>
      <h1 className="font-display text-3xl font-bold md:text-4xl">All published work</h1>
      <p className="mt-3 max-w-2xl text-muted">
        A complete archive of AltLab's research publications, grouped by year.
      </p>

      {years.map((year) => (
        <div key={year} className="mt-12">
          <h2 className="font-display text-xl font-bold text-primary">{year}</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {byYear[year].map((paper) => (
              <Link
                key={paper.id}
                href={`/research/${paper.slug}`}
                className="card-surface group rounded-xl p-5 transition-all hover:-translate-y-0.5"
              >
                <h3 className="font-display text-sm font-semibold leading-snug group-hover:text-primary md:text-base">
                  {paper.title}
                </h3>
                <p className="mt-1.5 text-xs text-muted">{formatDate(paper.publishedAt)}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {paper.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
