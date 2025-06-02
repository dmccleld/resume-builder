```dataviewjs
const tag = dv.current().file.name.split("-")[2] ?? "general";

// Get and sort projects by year descending
const projects = dv.page("projects").projects
  .filter(p => (p.tags || []).includes(tag))
  .sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

if (projects.length) {
  dv.header(3, "Projects");

  for (let p of projects) {
    // Build the header line
    let line = `**${p.title}** (${p.year})`;

    if (p.type === "work") {
      line += ` — *${p.organization}*`;
    } else if (p.type === "personal") {
      line += ` — *Personal Project*`;
    }

    if (p.links?.length) {
      const linkList = p.links.map(l => `[${l.label}](${l.url})`).join(" • ");
      line += ` — ${linkList}`;
    }

    dv.paragraph(line);
    dv.paragraph(p.description);
  }
}


```