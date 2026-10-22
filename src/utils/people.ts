import { getEntry } from "astro:content";

// Resolves a person id (e.g. a thesis supervisor) to a name and team page link.
// People who moved to alumni keep their name but have no team page to link to.
// Unknown ids fail the build, so a typo or a missed rename can't ship a broken link.
export async function getPerson(id: string): Promise<{ name: string; href?: string }> {
  const member = await getEntry("team", id);
  if (member) return { name: member.data.name, href: `/team/${id}` };

  const alumnus = await getEntry("alumni", id);
  if (alumnus) return { name: alumnus.data.name };

  throw new Error(`Unknown person "${id}": no src/content/team/${id}.md or src/content/alumni/${id}.md`);
}
