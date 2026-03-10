const config = dv.page("resume-config");
const tag = input.tag ?? config.tag;

const page = dv.page("education");
const entries = page.education.filter(e => (e.tags || []).includes(tag));

dv.header(3, "Education & Learning");

for (const e of entries) {
  const wrapper = document.createElement("div");
  wrapper.className = "education-block";

  let line = "";
  if (e.degree) {
    line += `<strong>${e.degree}</strong>`;
    if (e.minor) line += `, Minor in ${e.minor}`;
    line += `<br>${e.institution} (${e.year})`;
  } else if (e.certificate) {
    line += `<strong>${e.certificate}</strong>, ${e.organization} (${e.year})`;
  } else if (e.course) {
    line += `<strong>${e.course}</strong>, ${e.platform} (${e.year})`;
  }

  wrapper.innerHTML = line;
  dv.container.appendChild(wrapper);
}
