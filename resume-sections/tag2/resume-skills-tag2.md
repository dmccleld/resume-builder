```dataviewjs
dv.header(3, "Skills"); // <-- Add title directly here
const filterTag = dv.current().file.name.split("-")[2] ?? "general";
const page = dv.page("skills");

const sections = [
  { title: "Applications", list: page.applications },
  { title: "Programming", list: page.programming },
  { title: "Technologies", list: page.technologies },
  { title: "Databases", list: page.dbms },
  { title: "Systems", list: page.systems },
  { title: "Core competencies", list: page.core }
];

let html = "<div class='skill-grid'>";
for (let section of sections) {
  const filtered = section.list
    .filter(s => s.tags && s.tags.includes(filterTag))
    .map(s => s.name);
  if (filtered.length) {
    html += `<div class='skill-block'><strong>${section.title}:</strong><br>${filtered.join(", ")}</div>`;
  }
}
html += "</div>";

dv.el("div", html);
```