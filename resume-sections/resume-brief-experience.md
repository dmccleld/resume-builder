```dataviewjs
dv.header(3, "Experience");

const files = ["company-name"];

function parseDate(dateStr) {
  if (!dateStr || typeof dateStr !== "string" || dateStr.toLowerCase() === "none") return null;
  const date = new Date(dateStr);
  return isNaN(date) ? null : date;
}

function formatDate(d) {
  if (!d || isNaN(d.getTime())) return "Present";
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

let roles = [];

for (let fileName of files) {
  const file = dv.page(fileName);

  for (let role of file.roles) {
    roles.push({
      company: file.company,
      logo: file.logo,
      location: file.location,
      industry: file.industry ?? "",
      title: role.title,
      start: parseDate(role.start),
      end: parseDate(role.end),
      strengths: role.strengths ?? null
    });
  }
}

roles.sort((a, b) => (b.end ?? new Date()) - (a.end ?? new Date()));

for (let role of roles) {
  const range = `${formatDate(role.start)} – ${formatDate(role.end)}`;
  const summary = `
  <span class="role-title">${role.title}</span>, 
  <span class="company-name">${role.company}</span> 
  <span class="role-range">(${range})</span>
  ${role.strengths ? ` — <span class="role-strengths">${role.strengths}</span>` : ""}
`;


  const logoHTML = role.logo
    ? `<img src="${role.logo}" class="company-logo" alt="${role.company} logo" style="height: 16px; margin-right: 12px; vertical-align: middle;" />`
    : "";

  dv.paragraph(`
  <div class="company-entry">
    ${logoHTML}
    <div class="role-details">${summary}</div>
  </div>
`);
}
```
