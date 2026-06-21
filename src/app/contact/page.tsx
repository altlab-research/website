import { SectionLabel } from "@/components/Badge";
import { Mail, Github, Twitter } from "lucide-react";

export const metadata = { title: "Contact — AltLab" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
      <SectionLabel>Contact</SectionLabel>
      <h1 className="font-display text-3xl font-bold md:text-4xl">Get in touch</h1>
      <p className="mt-3 max-w-xl text-muted">
        Have a question, want to collaborate, or just want to say hello? Reach out — we read every message.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <a
          href="mailto:altlabresearch4@gmail.com"
          className="card-surface flex flex-col gap-3 rounded-xl p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Mail className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold">Email</p>
            <p className="mt-0.5 text-xs text-muted break-all">altlabresearch4@gmail.com</p>
          </div>
        </a>

        <a
          href="https://x.com/altlabresearch"
          target="_blank"
          rel="noreferrer"
          className="card-surface flex flex-col gap-3 rounded-xl p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Twitter className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold">X (Twitter)</p>
            <p className="mt-0.5 text-xs text-muted">@altlabresearch</p>
          </div>
        </a>

        <a
          href="https://github.com/altlab-research"
          target="_blank"
          rel="noreferrer"
          className="card-surface flex flex-col gap-3 rounded-xl p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Github className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold">GitHub</p>
            <p className="mt-0.5 text-xs text-muted">altlab-research</p>
          </div>
        </a>
      </div>

      <div className="card-surface mt-8 rounded-xl p-8">
        <h2 className="font-display text-lg font-semibold">Send a message</h2>
        <p className="mt-1 text-sm text-muted">
          Fill out the form below and we&apos;ll get back to you as soon as possible.
        </p>
        <form
          action="https://formsubmit.co/altlabresearch4@gmail.com"
          method="POST"
          className="mt-6 space-y-4"
        >
          {/* Disable captcha and redirect */}
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_subject" value="New message from AltLab website" />
          <input type="hidden" name="_template" value="table" />

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-medium text-muted">Name</span>
              <input
                name="name"
                required
                placeholder="Your name"
                className="input mt-1.5"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-muted">Email</span>
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="input mt-1.5"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-xs font-medium text-muted">Subject</span>
            <input
              name="subject"
              required
              placeholder="What's this about?"
              className="input mt-1.5"
            />
          </label>

          <label className="block">
            <span className="text-xs font-medium text-muted">Message</span>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Your message..."
              className="input mt-1.5"
            />
          </label>

          <button
            type="submit"
            className="rounded-lg bg-gradient-primary px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
