```dataviewjs
dv.header(3, "Experience"); // <-- Add section title here

const files = ["company-name"];
const filterTag = dv.current().file.name.split("-")[2] ?? "general";

let allRoles = [];

function parseDate(dateStr) {
  if (!dateStr || typeof dateStr !== "string" || dateStr.toLowerCase() === "none") return null;
  const date = new Date(dateStr);
  return isNaN(date) ? null : date;
}

function formatDate(d) {
  if (!d || isNaN(d.getTime())) return "Present";
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

// Collect all roles across files that match the tag
for (let fileName of files) {
  const file = dv.page(fileName);

  for (let role of file.roles) {
    const matchingBullets = role.bullets.filter(b => b.tags && b.tags.includes(filterTag));
    if (matchingBullets.length > 0) {
      allRoles.push({
        company: file.company,
        location: file.location,
        title: role.title,
        description: role.description ?? "",
        start: parseDate(role.start),
        end: parseDate(role.end),
        bullets: matchingBullets
      });
    }
  }
}

// Sort roles by end date descending (fallback to "now" if ongoing)
allRoles.sort((a, b) => (b.end ?? new Date()) - (a.end ?? new Date()));

let lastCompany = "";

for (let role of allRoles) {
  const companyHeader = `${role.company} – ${role.location}`;

  if (companyHeader !== lastCompany) {
    dv.header(5, companyHeader);
    lastCompany = companyHeader;
  }

  const startDate = formatDate(role.start);
  const endDate = formatDate(role.end);

  dv.paragraph(`**${role.title}** (${startDate} – ${endDate})`);
  if (role.description) {
    dv.paragraph(role.description);
  }

  dv.list(role.bullets.map(b =>
    b.text + (b.outcome ? ` — ${b.outcome}` : "")
  ));
}
```
