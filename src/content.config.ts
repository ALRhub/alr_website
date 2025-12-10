import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const publications = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/publications" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    authors: z.array(z.string()),
    year: z.number(),
    venue: z.string(),
    type: z.enum(['paper', 'book', 'patent', 'software']).default('paper'),
    cover: image().optional(),
    doi: z.string().optional(),
    award: z.string().optional(),
    links: z.object({
      pdf: z.string().optional(),
      code: z.string().optional(),
      website: z.string().optional(),
      demo: z.string().optional(),
      slides: z.string().optional(),
      video: z.string().optional(),
    }).optional(),
    featured: z.boolean().default(false),
    badges: z.array(z.object({
      text: z.string(),
      type: z.enum(['gold', 'blue', 'red', 'green', 'default']).default('default')
    })).optional(),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/team" }),
  schema: ({ image }) => z.object({
    name: z.string(),
    role: z.enum([
      'Principal Investigator', 
      'Professor', 
      'Associate Professor',
      'Assistant Professor',
      'Secretary',
      'IT Administrator',
      'Postdoc', 
      'Research Assistant',
      'PhD Student', 
      'Off-Campus PhD Student',
      'Master Student', 
      'Bachelor Student',
      'Hiwi',
      'Alumni'
    ]),
    avatar: image(),
    bio: z.string().optional(), // Short bio for card
    email: z.string().optional(),
    website: z.string().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    twitter: z.string().optional(),
    googleScholar: z.string().optional(),
    weight: z.number().default(100),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/news" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    summary: z.string().optional(),
  }),
});

const research = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/research" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    cover: image().optional(),
    order: z.number().default(100),
  }),
});

const softwares = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/softwares" }),
  schema: z.object({
    title: z.string(),
    developers: z.array(z.string()),
    date: z.date(),
    description: z.string(),
    order: z.number().default(100),
  }),
});

const theses = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/theses" }),
  schema: z.object({
    title: z.string(),
    types: z.array(z.enum([
      'bachelor',
      'master',
      'project',
    ])),
    topics: z.array(z.string()),
    supervisors: z.array(z.string()),
    start: z.string(),
    added: z.date(),
    order: z.number().default(100),
    assigned: z.boolean(),
    pdf: z.string(),
    student: z.string().optional()
  }),
});

export const collections = {
  publications,
  team,
  news,
  research,
  softwares,
  theses,
};
