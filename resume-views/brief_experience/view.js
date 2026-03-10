const config = dv.page("resume-config");
const base = config.file.folder.split("/").slice(0, -1).join("/");

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

let roles = [];

const cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;

for (let fileName of files) {
  const file = dv.page(fileName);
  if (!file?.roles) continue;

  for (let role of file.roles) {
    roles.push({
      company: file.company,
      logo: file.logo ? `01. Projects/resume/resume-cmdb/${file.logo}` : null,
      location: file.location,
      title: role.title,
      start: parseDate(role.start),
      end: parseDate(role.end),
      strengths: role.strengths ?? null
    });
  }
}

roles.sort((a, b) => (b.end ?? new Date()) - (a.end ?? new Date()));

dv.header(3, "Experience");

for (let role of roles) {
  const range = `${formatDate(role.start)} – ${formatDate(role.end)}`;

  const entry = document.createElement("div");
  entry.className = "company-entry";
  entry.style.cssText = "display: flex; align-items: flex-start; margin-bottom: 12px;";

  const logoDiv = document.createElement("div");
  logoDiv.style.cssText = "min-width: 80px; margin-right: 12px; padding-top: 2px;";
  if (role.logo) {
    const img = document.createElement("img");
    img.src = app.vault.adapter.getResourcePath(role.logo);
    img.alt = `${role.company} logo`;
    img.style.height = "16px";
    img.className = "company-logo";
    logoDiv.appendChild(img);
  }

  const details = document.createElement("div");
  details.className = "role-details";
  details.innerHTML = `
    <span class="role-title">${role.title}</span>, 
    <span class="company-name">${role.company}</span> 
    <span class="role-range">(${range})</span>
    ${role.strengths ? ` — <span class="role-strengths">${cap(role.strengths)}</span>` : ""}
  `;

  entry.appendChild(logoDiv);
  entry.appendChild(details);
  dv.container.appendChild(entry);
}
