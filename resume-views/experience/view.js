const config = dv.page("resume-config");
const base = config.file.folder.split("/").slice(0, -1).join("/");

const tag = input.tag ?? config.tag;
const simplified = input.simplified ?? false;
const showAll = input.showAll ?? false;

const cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
const esc = s => s ? s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : "";

const files = dv.pages(`"${base}/resume-cmdb"`)
  .where(p => p.type === "job_description")
  .map(p => p.file.name)
  .array();

function parseDate(dateStr) {
  if (!dateStr || typeof dateStr !== "string" || dateStr.toLowerCase() === "none") return null;
  const date = new Date(dateStr);
  return isNaN(date) ? null : date;
}

function formatDate(d) {
  if (!d || isNaN(d.getTime())) return "Present";
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

let allRoles = [];

for (let fileName of files) {
  const file = dv.page(fileName);
  if (!file?.roles) continue;

  for (const role of file.roles) {
    const matchingBullets = role.bullets?.filter(b => b.tags?.includes(tag)) ?? [];
    if (matchingBullets.length > 0 || showAll) {
      allRoles.push({
        company: file.company,
        location: file.location,
        title: role.title,
        description: role.description ?? "",
        simplified: role.simplified ?? "",
        start: parseDate(role.start),
        end: parseDate(role.end),
        bullets: matchingBullets
      });
    }
  }
}

allRoles.sort((a, b) => (b.end ?? new Date()) - (a.end ?? new Date()));

let html = `<div class="experience-section"><h3>Experience</h3>`;

for (const role of allRoles) {
  const descText = simplified ? role.simplified : role.description;
  const desc = descText ? `<div class="role-summary">${esc(cap(descText))}</div>` : "";

  const bulletItems = role.bullets.map(b => {
    const txt = (simplified ? b.simplified?.trim() : b.text?.trim()) ?? "";
    const capped = cap(txt);
    const final = capped.endsWith(".") ? capped : capped + ".";
    return `<li>${esc(final)}</li>`;
  }).join("");

  html += `
    <div class="role-block">
      <div>
        <span class="role-title">${esc(role.title)}</span><br>
        <span class="company-name">${esc(role.company)} – ${esc(role.location)}</span>
        <span class="role-range">(${formatDate(role.start)} – ${formatDate(role.end)})</span>
      </div>
      ${desc}
      <ul>${bulletItems}</ul>
    </div>`;
}

html += `</div>`;

const section = document.createElement("div");
section.innerHTML = html;
dv.container.appendChild(section);
