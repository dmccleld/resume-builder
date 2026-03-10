```dataviewjs
const config = dv.page("resume-config");
const base = config.file.folder.split("/").slice(0, -1).join("/");

await dv.view(`${base}/resume-views/contact`, {});
await dv.view(`${base}/resume-views/valueprop`, {});
await dv.view(`${base}/resume-views/skills`, {});
await dv.view(`${base}/resume-views/brief_experience`, {});
```
