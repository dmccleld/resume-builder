const config = dv.page("resume-config");
const tag = input.tag ?? config.tag;

const cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;

const projects = dv.page("projects").projects
  .filter(p => (p.tags || []).includes(tag))
  .sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

if (projects.length) {
  dv.header(3, "Projects");

  for (let p of projects) {
    const block = document.createElement("div");
    block.className = "project-block";

    const header = document.createElement("p");
    header.style.marginBottom = "2px";

    let headerHTML = `<strong>${p.title}</strong> (${p.year})`;
    if (p.type === "work") {
      headerHTML += ` — <em>${p.organization}</em>`;
    } else if (p.type === "personal") {
      headerHTML += ` — <em>Personal Project</em>`;
    }
    if (p.links?.length) {
      const linkList = p.links.map(l => `<a href="${l.url}">${l.label}</a>`).join(" • ");
      headerHTML += ` — ${linkList}`;
    }
    header.innerHTML = headerHTML;
    block.appendChild(header);

    const desc = document.createElement("p");
    desc.style.marginTop = "2px";
    desc.textContent = cap(p.description);
    block.appendChild(desc);

    dv.container.appendChild(block);
  }
}
