import { SectionLabel } from "@/components/Badge";
import ResearchCard from "@/components/ResearchCard";
import { getPapers } from "@/lib/data";

export const dynamic = 'force-dynamic';

export const metadata = { title: "Research — AltLab" };

export default async function ResearchPage() {
  const papers = await getPapers();

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
      <SectionLabel>Research</SectionLabel>
      <h1 className="font-display text-3xl font-bold md:text-4xl">
        Papers from the AltLab research program
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        We publish our findings on memory systems, agent orchestration, runtime
        infrastructure, and AI-native operating systems as we develop them.
      </p>

      <div className="mt-10 space-y-4">
        {papers.map((paper) => (
          <ResearchCard key={paper.id} paper={paper} />
        ))}
      </div>
    </div>
  );
}
