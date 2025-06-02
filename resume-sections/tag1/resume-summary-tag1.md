```dataviewjs
// Expected filename format: resume-summary-<tag>
const fileParts = dv.current().file.name.split("-");
const filterLabel = fileParts[2] ?? "general";

const summaryPage = dv.page("summary");
const match = summaryPage.summaries.find(s => s.label === filterLabel);

if (match) {
  dv.header(3, match.title);
  dv.paragraph(match.text);
} else {
  dv.paragraph("No summary found for tag: " + filterLabel);
}

