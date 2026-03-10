const config = dv.page("resume-config");
const tag = input.tag ?? config.tag;

const valueProps = dv.page("summary").valueprop;
const match = valueProps.find(v => v.label === tag)
           ?? valueProps.find(v => v.label === "general");

if (match) {
  dv.header(3, match.title ?? "Highlight");
  dv.paragraph(match.text);
} else {
  dv.paragraph("No value proposition found for tag: " + tag);
}
