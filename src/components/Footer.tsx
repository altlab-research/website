import Link from "next/link";
import Logo from "./Logo";
import { Github, Twitter } from "lucide-react";

const COLUMNS = [
  {
    title: "Research",
    links: [
      { href: "/research", label: "Papers" },
      { href: "/publications", label: "Publications" },
      { href: "/experiments", label: "Labs" },
    ],
  },
  {
    title: "Products",
    links: [
      { href: "/projects/altmemory", label: "AltMemory" },
      { href: "/projects/altflow", label: "AltFlow" },
      { href: "/projects/altruntime", label: "AltRuntime" },
      { href: "/projects/altos", label: "AltOS" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/careers", label: "Careers" },
      { href: "/blog", label: "Blog" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <Logo className="h-7 w-7" />
              <span className="font-display text-lg font-bold">AltLab</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted">
              Engineering the future of AI-native computing — memory systems, agent
              orchestration, runtimes, and intelligent operating systems.
            </p>
            <div className="mt-5 flex gap-4">
              <a href="https://github.com/altlab-research" target="_blank" rel="noreferrer" className="text-muted hover:text-ink">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://x.com/altlabresearch" target="_blank" rel="noreferrer" className="text-muted hover:text-ink">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-semibold text-ink">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted md:flex-row">
          <p>&copy; {new Date().getFullYear()} AltLab. All rights reserved.</p>
          <p>Built for AI-native computing.</p>
        </div>
      </div>
    </footer>
  );
}
