const config = dv.page("resume-config");
const tag = input.tag ?? config.tag;
const layout = input.layout ?? config.skills_layout ?? "chiclet";

const page = dv.page("skills");

const sections = [
  { key: "Applications", list: page.applications },
  { key: "Programming", list: page.programming },
  { key: "Technologies", list: page.technologies },
  { key: "Databases", list: page.dbms },
  { key: "Systems", list: page.systems },
  { key: "Core Competencies", list: page.core },
  { key: "Soft Skills", list: page.softskills }
];

dv.header(3, "Skills");

if (layout === "plain") {
  for (let section of sections) {
    const filtered = (section.list ?? [])
      .filter(s => s.tags && s.tags.includes(tag))
      .map(s => s.name);

    if (!filtered.length) continue;

    const row = dv.container.createEl("div", { cls: "skills-plain-row" });
    row.createEl("span", { cls: "skills-plain-label", text: section.key + ": " });
    row.createEl("span", { text: filtered.join(", ") });
  }
} else {
  const wrapperCls = layout === "2col"
    ? "skills-chiclet-wrapper skills-chiclet-2col"
    : "skills-chiclet-wrapper";

  const wrapper = dv.container.createEl("div", { cls: wrapperCls });

  for (let section of sections) {
    const filtered = (section.list ?? [])
      .filter(s => s.tags && s.tags.includes(tag))
      .map(s => s.name);

    if (!filtered.length) continue;

    const block = wrapper.createEl("div", { cls: "skills-chiclet-group" });

    block.createEl("div", {
      cls: "skills-chiclet-label",
      text: section.key
    });

    const chicletRow = block.createEl("div", { cls: "skills-chiclet-row" });

    for (let skill of filtered) {
      chicletRow.createEl("span", {
        cls: "skills-chiclet",
        text: skill
      });
    }
  }
}
