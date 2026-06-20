import type { Paper, Post, Project, Experiment, CareerListing } from "@/types";

// ---------------------------------------------------------------------------
// This file is the single data-access layer for the public site.
// Right now every function returns in-memory mock data so the app runs with
// zero configuration. Once DATABASE_URL is set, swap the body of each
// function for the matching Prisma call (shown in comments) — the shape of
// the returned objects already matches the Prisma models 1:1.
// ---------------------------------------------------------------------------

export const PAPERS: Paper[] = [
  {
    id: "1",
    title: "AltLab-01: A Scalable Architecture for Multi-Agent Systems",
    slug: "scalable-architecture-multi-agent-systems",
    abstract:
      "We propose a modular architecture for building scalable, collaborative AI agent systems. Our design separates planning, memory, and execution into independently scalable services connected by a typed message bus, allowing agent fleets to coordinate on long-horizon tasks without centralized bottlenecks. We evaluate the architecture on three multi-agent benchmarks and show a 3.4x improvement in task completion rate over monolithic agent runtimes.",
    authors: ["Faruq Adegboyega", "AltLab Systems Group"],
    thumbnail: null,
    pdfUrl: "#",
    githubUrl: "https://github.com/altlab/multi-agent-arch",
    architectureUrl: "#",
    publishedAt: "2026-05-12",
    tags: ["AI Agents", "Systems", "Coordination"],
    citations: 12,
    downloads: 842,
    views: 5310,
    content: `## Overview

Multi-agent AI systems are increasingly deployed for tasks that exceed the
context window, tool budget, or reasoning depth of a single model call. Yet
most production agent frameworks still treat coordination as an
afterthought, bolting a planner onto an execution loop that was designed for
a single actor.

## Architecture

AltLab-01 introduces a three-layer separation:

- **Planning layer** — decomposes goals into typed subtasks and assigns owners.
- **Memory layer** — a shared, versioned context store agents read and write to, with conflict resolution at the field level.
- **Execution layer** — stateless workers that pull subtasks, execute tools, and report structured results back to the bus.

## Results

Across three benchmarks — long-horizon planning, tool-heavy retrieval, and collaborative code editing — the architecture improved task completion rate by 3.4x relative to a monolithic baseline, while reducing redundant tool calls by 58%.

## Future Work

We are extending this architecture into AltRuntime, our general-purpose execution infrastructure for agent fleets.`,
  },
  {
    id: "2",
    title: "AltLab-02: Persistent Memory Systems for AI Applications",
    slug: "persistent-memory-systems-ai-applications",
    abstract:
      "A novel memory architecture designed for long-term persistence and semantic retrieval in AI applications. We introduce a hybrid ranking function that combines recency, semantic similarity, and usage frequency, and demonstrate that it outperforms pure vector-similarity retrieval on multi-session recall tasks by 27%.",
    authors: ["Faruq Adegboyega", "AltLab Memory Group"],
    thumbnail: null,
    pdfUrl: "#",
    githubUrl: "https://github.com/altlab/altmemory",
    architectureUrl: "#",
    publishedAt: "2026-04-28",
    tags: ["Memory", "Infrastructure", "Retrieval"],
    citations: 9,
    downloads: 631,
    views: 4022,
    content: `## Motivation

Most AI applications today are stateless between sessions. AltMemory addresses this by providing a persistence layer purpose-built for AI agents and assistants.

## Method

We rank candidate memories using a weighted combination of:

1. Semantic similarity to the current query
2. Recency-weighted decay
3. Historical usage frequency

## Evaluation

On a multi-session recall benchmark spanning 30-day conversation histories, our hybrid ranking improved recall accuracy by 27% over cosine-similarity-only baselines, with no measurable latency regression.`,
  },
  {
    id: "3",
    title: "AltLab-03: Workflow Orchestration Engine Design",
    slug: "workflow-orchestration-engine-design",
    abstract:
      "Design and evaluation of a distributed workflow engine for complex task orchestration across heterogeneous AI agents. We detail the scheduling algorithm powering AltFlow and benchmark it against three open-source orchestration frameworks.",
    authors: ["Faruq Adegboyega", "AltLab Runtime Group"],
    thumbnail: null,
    pdfUrl: "#",
    githubUrl: "https://github.com/altlab/altflow",
    architectureUrl: "#",
    publishedAt: "2026-04-15",
    tags: ["Workflows", "Automation", "Scheduling"],
    citations: 6,
    downloads: 411,
    views: 2890,
    content: `## Problem

Coordinating dozens of AI agents across a pipeline requires a scheduler that understands both data dependencies and resource constraints — most workflow engines were built for deterministic jobs, not probabilistic agent steps that can fail, retry, or branch.

## Design

AltFlow's scheduler models each pipeline as a directed graph of typed steps, with first-class support for conditional branching on agent output and automatic retry with exponential backoff.

## Benchmarks

We compare against three popular orchestration frameworks on a synthetic 200-step agentic pipeline and report a 41% reduction in end-to-end latency.`,
  },
  {
    id: "4",
    title: "AltLab-04: Toward AI-Native Operating Systems",
    slug: "toward-ai-native-operating-systems",
    abstract:
      "We outline the design principles for AltOS, an operating system layer built around persistent agent memory, intelligent workflows, and context-aware resource scheduling — treating AI agents as first-class processes rather than applications running on top of a traditional OS.",
    authors: ["Faruq Adegboyega"],
    thumbnail: null,
    pdfUrl: "#",
    githubUrl: "https://github.com/altlab/altos",
    architectureUrl: "#",
    publishedAt: "2026-03-02",
    tags: ["Operating Systems", "Agents", "Future Computing"],
    citations: 4,
    downloads: 298,
    views: 2104,
    content: `## Thesis

Traditional operating systems schedule processes around CPU time and memory pages. An AI-native OS needs to schedule around context windows, tool access, and persistent agent state.

## Core Components

- A kernel-level memory service shared across agent processes
- Context-aware scheduling that prioritizes by task urgency, not just CPU fairness
- A permission model for tool and data access scoped per agent

This paper lays out the design space and our current prototype results.`,
  },
];

export const PROJECTS: Project[] = [
  {
    id: "1",
    name: "AltMemory",
    slug: "altmemory",
    tagline: "Persistent Memory Infrastructure",
    description:
      "A modular memory system for AI agents with long-term persistence, semantic search, and context management. AltMemory gives any agent a durable, queryable memory layer that survives across sessions.",
    status: "ACTIVE",
    features: ["Semantic Retrieval", "Memory Ranking", "Long-term Storage"],
    icon: "Layers",
    color: "#6D5EF3",
    githubUrl: "https://github.com/altlab/altmemory",
    docsUrl: "#",
  },
  {
    id: "2",
    name: "AltFlow",
    slug: "altflow",
    tagline: "AI Workflow Orchestration",
    description:
      "Coordinate multi-agent pipelines with typed steps, conditional branching, and automatic retries. AltFlow is the orchestration layer powering production agent workflows at AltLab.",
    status: "ACTIVE",
    features: ["Agent Coordination", "Workflow Pipelines", "Scheduling"],
    icon: "Workflow",
    color: "#7C3AED",
    githubUrl: "https://github.com/altlab/altflow",
    docsUrl: "#",
  },
  {
    id: "3",
    name: "AltRuntime",
    slug: "altruntime",
    tagline: "Execution Infrastructure",
    description:
      "The execution substrate for agent fleets — task scheduling, runtime state management, concurrency control, and distributed execution across heterogeneous compute.",
    status: "ALPHA",
    features: ["Task Scheduling", "Runtime State", "Concurrency", "Distributed Execution"],
    icon: "Cpu",
    color: "#6D5EF3",
    githubUrl: "https://github.com/altlab/altruntime",
    docsUrl: "#",
  },
  {
    id: "4",
    name: "AltOS",
    slug: "altos",
    tagline: "AI-Native Operating System",
    description:
      "An operating system layer reimagined around persistent memory, intelligent workflows, and agent-first context awareness — the long-term research bet underlying everything else we build.",
    status: "RESEARCH",
    features: ["Persistent Memory", "Intelligent Workflows", "AI Desktop", "Agent System", "Context Awareness"],
    icon: "Sparkles",
    color: "#7C3AED",
    githubUrl: "https://github.com/altlab/altos",
    docsUrl: "#",
  },
];

export const EXPERIMENTS: Experiment[] = [
  {
    id: "1",
    name: "Memory Compression",
    slug: "memory-compression",
    description:
      "Investigating lossy and lossless compression schemes for long-horizon agent memory to reduce storage cost without degrading recall accuracy.",
    status: "RUNNING",
    tags: ["Memory", "Compression"],
    progress: 64,
  },
  {
    id: "2",
    name: "Workflow Planning",
    slug: "workflow-planning",
    description:
      "Evaluating LLM-driven dynamic workflow planning against static DAG pipelines for adaptability under changing task constraints.",
    status: "RUNNING",
    tags: ["Workflows", "Planning"],
    progress: 41,
  },
  {
    id: "3",
    name: "Agent Coordination",
    slug: "agent-coordination",
    description:
      "Benchmarking message-passing protocols for multi-agent coordination at scale, comparing broadcast, gossip, and centralized bus models.",
    status: "COMPLETED",
    tags: ["Agents", "Coordination"],
    progress: 100,
  },
  {
    id: "4",
    name: "Execution Optimization",
    slug: "execution-optimization",
    description:
      "Reducing tail latency in AltRuntime's task scheduler through speculative execution and adaptive batching.",
    status: "RESEARCH",
    tags: ["Runtime", "Performance"],
    progress: 18,
  },
  {
    id: "5",
    name: "Context Window Scheduling",
    slug: "context-window-scheduling",
    description:
      "Prototype scheduler that allocates context budget across concurrent agent tasks based on predicted information value.",
    status: "RUNNING",
    tags: ["Scheduling", "Context"],
    progress: 33,
  },
];

export const POSTS: Post[] = [
  {
    id: "1",
    title: "Why We're Building an AI-Native Operating System",
    slug: "why-were-building-an-ai-native-operating-system",
    cover: null,
    excerpt:
      "Operating systems were designed for processes and threads, not for agents with memory, goals, and tool access. Here's why we think that needs to change.",
    content: `Most of the software stack AI agents run on today was designed for a world without them. Processes, file systems, and schedulers all assume a deterministic program with a fixed memory footprint — not an agent that reasons, remembers, and adapts.

At AltLab, we think the next decade of computing infrastructure needs to be rebuilt around agents as first-class citizens. That's the thesis behind AltOS, and the same thinking shapes everything else we publish.

This post is the first in a series walking through our reasoning, starting with memory.`,
    tags: ["AltOS", "Vision"],
    createdAt: "2026-05-20",
  },
  {
    id: "2",
    title: "Inside AltMemory's Ranking Function",
    slug: "inside-altmemorys-ranking-function",
    cover: null,
    excerpt:
      "A walkthrough of the hybrid recency/similarity/frequency ranking function that powers semantic recall in AltMemory.",
    content: `When we started building AltMemory, our first instinct was pure vector similarity search. It worked — until conversations spanned weeks and the most "similar" memory wasn't always the most useful one.

This post breaks down the three signals we now combine, how we weight them, and what we learned benchmarking against naive cosine similarity.`,
    tags: ["AltMemory", "Engineering"],
    createdAt: "2026-05-02",
  },
  {
    id: "3",
    title: "Lessons from Benchmarking Multi-Agent Pipelines",
    slug: "lessons-from-benchmarking-multi-agent-pipelines",
    cover: null,
    excerpt:
      "What broke, what scaled, and what surprised us while stress-testing AltFlow against open-source orchestration frameworks.",
    content: `We ran AltFlow against three popular open-source orchestration frameworks on a synthetic 200-step pipeline. The results were not what we expected going in.

This post covers the benchmark setup, the failure modes we hit in existing frameworks, and the specific scheduling decisions that gave AltFlow its latency advantage.`,
    tags: ["AltFlow", "Benchmarks"],
    createdAt: "2026-04-18",
  },
];

export const CAREERS: CareerListing[] = [
  {
    id: "1",
    title: "Research Engineer, Memory Systems",
    slug: "research-engineer-memory-systems",
    department: "Research",
    location: "Remote",
    type: "Full-time",
    description:
      "Design and implement retrieval and ranking systems for AltMemory. Strong background in information retrieval or recommendation systems preferred.",
  },
  {
    id: "2",
    title: "Distributed Systems Engineer, AltRuntime",
    slug: "distributed-systems-engineer-altruntime",
    department: "Infrastructure",
    location: "Remote",
    type: "Full-time",
    description:
      "Build the scheduling and execution layer that powers agent fleets in production. Experience with distributed systems and Go or Rust preferred.",
  },
  {
    id: "3",
    title: "Research Scientist, Agent Coordination",
    slug: "research-scientist-agent-coordination",
    department: "Research",
    location: "Remote",
    type: "Full-time",
    description:
      "Lead research into multi-agent coordination protocols, publishing findings as part of AltLab's public research program.",
  },
];

// ---------------------------------------------------------------------------
// Accessors — swap these bodies for Prisma calls when DATABASE_URL is live.
// ---------------------------------------------------------------------------

export async function getPapers(): Promise<Paper[]> {
  // return prisma.paper.findMany({ orderBy: { publishedAt: "desc" } });
  return [...PAPERS].sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
}

export async function getPaperBySlug(slug: string): Promise<Paper | undefined> {
  // return prisma.paper.findUnique({ where: { slug } });
  return PAPERS.find((p) => p.slug === slug);
}

export async function getProjects(): Promise<Project[]> {
  // return prisma.project.findMany({ orderBy: { order: "asc" } });
  return PROJECTS;
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  // return prisma.project.findUnique({ where: { slug } });
  return PROJECTS.find((p) => p.slug === slug);
}

export async function getExperiments(): Promise<Experiment[]> {
  // return prisma.experiment.findMany();
  return EXPERIMENTS;
}

export async function getPosts(): Promise<Post[]> {
  // return prisma.post.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } });
  return [...POSTS].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  // return prisma.post.findUnique({ where: { slug } });
  return POSTS.find((p) => p.slug === slug);
}

export async function getCareers(): Promise<CareerListing[]> {
  // return prisma.careerListing.findMany({ where: { active: true } });
  return CAREERS;
}
