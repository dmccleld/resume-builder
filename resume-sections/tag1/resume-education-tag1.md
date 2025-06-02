```dataviewjs
dv.header(3, "Education"); // <-- Add section title here
const tag = dv.current().file.name.split("-")[2] ?? "general";
const page = dv.page("education");

const entries = page.education.filter(e =>
  (e.tags || []).includes(tag)
);

for (let e of entries) {
  if (e.degree) {
    let degreeLine = `**${e.degree}**`;
    if (e.minor) {
      degreeLine += `, Minor in ${e.minor}`;
    }
    dv.paragraph(`${degreeLine}  
${e.institution} (${e.year})`);
  } else if (e.certificate) {
    dv.paragraph(`**${e.certificate}**, ${e.organization} (${e.year})`);
  } else if (e.course) {
    dv.paragraph(`**${e.course}**, ${e.platform} (${e.year})`);
  }
}

