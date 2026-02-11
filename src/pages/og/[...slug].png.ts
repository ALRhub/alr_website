import { getCollection } from 'astro:content';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { SITE } from '../../config';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export async function getStaticPaths() {
  const team = await getCollection('team');
  const research = await getCollection('research');
  const softwares = await getCollection('softwares');

  // Define static pages
  const pages = [
    { slug: 'index', title: SITE.labName, subtitle: SITE.description, image: "public/assets/alr-logo.png" },
    { slug: 'team', title: 'Team', subtitle: 'That\'s us', image: null },
    { slug: 'research', title: 'Research Areas', subtitle: 'Reinforcement Learning, Imitation Learning, ML for Simulation, and Generative Modeling', image: null },
    { slug: 'software', title: 'Software', subtitle: 'Open Source Software', image: null },
    { slug: 'publications', title: 'Publications', subtitle: 'Selected Publications', image: null },
    { slug: 'robots', title: 'Robots', subtitle: 'Our Robots', image: null },
    { slug: 'theses', title: 'Theses', subtitle: 'Available and Assigned Thesis Topics', image: null },
  ];

  // Generate paths for static pages
  const staticPaths = pages.map(page => ({
    params: { slug: page.slug },
    props: { title: page.title, subtitle: page.subtitle, image: page.image },
  }));

  // Generate paths for dynamic content
  const teamPaths = team.map(member => {
    const slug = `team/${member.id.replace(/\.[^/.]+$/, "")}`;
    return {
      params: { slug },
      props: {
        title: member.data.name,
        subtitle: member.data.role,
        image: member.data.avatar
      },
    };
  });

  const researchPaths = research.map(item => {
    const slug = `research/${item.id.replace(/\.[^/.]+$/, "")}`;
    return {
      params: { slug },
      props: {
        title: item.data.title,
        subtitle: item.data.description,
        image: item.data.cover
      },
    };
  });

  const softwarePaths = softwares.map(item => ({
    params: { slug: `news/${item.id.replace(/\.[^/.]+$/, "")}` },
    props: {
      title: item.data.title,
      subtitle: item.data.description,
      image: null,
    },
  }));

  return [
    ...staticPaths,
    ...teamPaths,
    ...researchPaths,
    ...softwarePaths,
  ];
}

export async function GET({ params, props }: { params: any; props: any }) {
  const { title, subtitle, image } = props;
  const slug = params.slug || 'index';
  const id = slug.split('/').pop(); // Extract "jane-doe" from "team/jane-doe"
  const section = slug.split('/')[0];

  // 1. Load Fonts
  const fontData = await readFile(join(process.cwd(), 'public/fonts/Inter-Bold.woff'));
  const regularFontData = await readFile(join(process.cwd(), 'public/fonts/Inter-Regular.woff'));

  // 2. Try to find a custom image for this page
  let imagePath = null;
  if (image) {
    if (typeof image === "string") {
      imagePath = image;
    } else {
      imagePath = image.fsPath;
    }
  }

  let imageSrc = null;
  if (imagePath) {
    const imageBuffer = await readFile(imagePath);

    // Convert to Base64 for Satori
    let encoding = null;
    if (imagePath.toLowerCase().endsWith("png")) {
      encoding = "png";
    } else if (imagePath.toLowerCase().endsWith("jpg") || imagePath.toLowerCase().endsWith("jpeg")) {
      encoding = "jpeg";
    }
    imageSrc = `data:image/${encoding};base64,${imageBuffer.toString('base64')}`;
  }

  // 3. Define Fallback Icons
  const icons: Record<string, string> = {
    index: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    research: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
    team: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
    publications: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  };
  const iconPath = icons[section] || icons[slug] || icons.index;

  // 4. Generate the Logic: Image OR Icon
  const visualElement = imageSrc ? {
    type: 'img',
    props: {
      src: imageSrc,
      style: {
        // width: '200px',
        height: '200px',
        borderRadius: section === 'team' ? '50%' : '12px', // Round for people, square for news
        objectFit: 'cover',
        marginBottom: '30px',
        border: '4px solid #ebf8ff',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      },
    }
  } : {
    // ... The original Icon code ...
    type: 'div',
    props: {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80px',
        height: '80px',
        borderRadius: '20px',
        backgroundColor: '#ebf8ff',
        color: '#3182ce',
        marginBottom: '30px',
      },
      children: [{
        type: 'svg',
        props: {
          width: '40', height: '40', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round',
          children: [{ type: 'path', props: { d: iconPath } }],
        },
      }],
    },
  };

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc', backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '30px 30px',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', padding: '30px 100px', borderRadius: '30px', border: '1px solid #e2e8f0', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)', position: 'relative', overflow: 'hidden', minWidth: '800px', // Added min-width to ensure consistent card size
              },
              children: [
                // *** INSERT THE DYNAMIC VISUAL HERE ***
                visualElement,

                // Title
                { type: 'div', props: { style: { fontSize: '64px', fontWeight: 700, color: '#1a202c', marginBottom: '16px', textAlign: 'center', letterSpacing: '-0.02em' }, children: title } },
                // Subtitle
                { type: 'div', props: { style: { fontSize: '32px', color: '#64748b', textAlign: 'center', maxWidth: '600px', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }, children: subtitle } },
                // Footer
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', alignItems: 'center', marginTop: '50px', paddingTop: '10px', borderTop: '2px solid #f1f5f9', width: '100%', justifyContent: 'center' },
                    children: [
                      { type: 'div', props: { style: { fontSize: '20px', fontWeight: 600, color: '#475569', letterSpacing: '0.05em', textTransform: 'uppercase' }, children: SITE.title } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    } as any,
    {
      width: 1200, height: 630,
      fonts: [
        { name: 'Inter', data: fontData, weight: 700, style: 'normal' },
        { name: 'Inter', data: regularFontData, weight: 400, style: 'normal' },
      ],
    }
  );

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
  return new Response(resvg.render().asPng() as any, {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' },
  });
}
