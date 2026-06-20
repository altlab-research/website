import { PrismaClient } from "@prisma/client";
import { PAPERS, PROJECTS, EXPERIMENTS, POSTS, CAREERS } from "../src/lib/data";

const prisma = new PrismaClient();

async function main() {
  for (const p of PAPERS) {
    await prisma.paper.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        title: p.title,
        slug: p.slug,
        abstract: p.abstract,
        authors: p.authors,
        pdfUrl: p.pdfUrl,
        githubUrl: p.githubUrl,
        architectureUrl: p.architectureUrl,
        publishedAt: new Date(p.publishedAt),
        tags: p.tags,
        content: p.content,
        citations: p.citations,
        downloads: p.downloads,
        views: p.views,
      },
    });
  }

  for (const p of PROJECTS) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        name: p.name,
        slug: p.slug,
        tagline: p.tagline,
        description: p.description,
        status: p.status,
        features: p.features,
        icon: p.icon,
        color: p.color,
        githubUrl: p.githubUrl,
        docsUrl: p.docsUrl,
      },
    });
  }

  for (const e of EXPERIMENTS) {
    await prisma.experiment.upsert({
      where: { slug: e.slug },
      update: {},
      create: {
        name: e.name,
        slug: e.slug,
        description: e.description,
        status: e.status,
        tags: e.tags,
        progress: e.progress,
      },
    });
  }

  for (const post of POSTS) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        title: post.title,
        slug: post.slug,
        cover: post.cover,
        excerpt: post.excerpt,
        content: post.content,
        tags: post.tags,
      },
    });
  }

  for (const c of CAREERS) {
    await prisma.careerListing.upsert({
      where: { slug: c.slug },
      update: {},
      create: {
        title: c.title,
        slug: c.slug,
        department: c.department,
        location: c.location,
        type: c.type,
        description: c.description,
      },
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
