```dataviewjs
const currentTag = dv.current().file.name.split("-").pop(); // e.g. "ai", "compliance", etc.
const valueProps = dv.page("summary").valueprop;

const match = valueProps.find(v => v.label === currentTag) 
           ?? valueProps.find(v => v.label === "general"); // fallback

if (match) {
  dv.header(3, match.title ?? "Highlight");
  dv.paragraph(match.text);
} else {
  dv.paragraph("No value proposition found.");
}

```