```dataviewjs
const config = dv.page("resume-config");
const base = config.file.folder.split("/").slice(0, -1).join("/");


await dv.view(`${base}/resume-views/contact`, {});
await dv.view(`${base}/resume-views/summary`, {});
await dv.view(`${base}/resume-views/skills`, { layout: "plain" });
await dv.view(`${base}/resume-views/experience`, { simplified: false, showAll: true });
await dv.view(`${base}/resume-views/projects`, {});
await dv.view(`${base}/resume-views/education`, {});
```
