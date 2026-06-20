import { SectionLabel } from "@/components/Badge";
import { getCareers } from "@/lib/data";
import { MapPin, Briefcase, ArrowRight } from "lucide-react";

export const metadata = { title: "Careers — AltLab" };

export default async function CareersPage() {
  const careers = await getCareers();

  return (
    <div className="mx-auto max-w-4xl px-5 py-14 md:px-8 md:py-20">
      <SectionLabel>Careers</SectionLabel>
      <h1 className="font-display text-3xl font-bold md:text-4xl">Work on AI-native infrastructure</h1>
      <p className="mt-3 max-w-2xl text-muted">
        We're a small, research-first team building production infrastructure
        for AI agents. If that excites you, we'd like to hear from you — even
        if nothing below is an exact fit.
      </p>

      <div className="mt-10 space-y-4">
        {careers.map((job) => (
          <div key={job.id} className="card-surface rounded-xl p-6 transition-all hover:-translate-y-0.5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-lg font-semibold">{job.title}</h3>
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted">
                  <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {job.department}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {job.location}</span>
                  <span>{job.type}</span>
                </div>
              </div>
              <a
                href={`mailto:careers@altlab.dev?subject=${encodeURIComponent(job.title)}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:border-primary/50"
              >
                Apply <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <p className="mt-4 text-sm text-muted">{job.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
