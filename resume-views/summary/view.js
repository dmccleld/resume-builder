const config = dv.page("resume-config");
const tag = input.tag ?? config.tag;

const summaryPage = dv.page("summary");
const match = summaryPage.summaries.find(s => s.label === tag)
           ?? summaryPage.summaries.find(s => s.label === "general");

if (match) {
  dv.header(3, match.title);
  dv.paragraph(match.text);
} else {
  dv.paragraph("No summary found for tag: " + tag);
}
