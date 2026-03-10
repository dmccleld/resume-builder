# resume-builder
# 🧾 Obsidian Resume Builder Guide

This guide helps you create customized resumes using Obsidian and DataviewJS, leveraging tags to filter relevant content dynamically.

---

## 📜 License

This tool is licensed under a custom license permitting only non-commercial use. Commercial use is prohibited without explicit permission. See [LICENSE](./LICENSE) for details.

---

## 🔧 Prerequisites

Before you begin using this resume builder, ensure you have the following:

- **Obsidian**: Installed and set up with a vault.

- **Dataview Plugin**: Installed and enabled in Obsidian.

- **Basic YAML Knowledge**: Comfort with editing frontmatter and markdown.

- **Consistent Tag Usage**: Choose and consistently apply tags like `ai`, `frontend`, etc., to categorize your resume content effectively.

- **Custom CSS (Optional)**: For better control over formatting, use `resume.css`.

---

## 📁 File Overview

Your vault includes the following modular components:

- `contact-info.md` – Your basic contact information.

- `summary.md` – Summary statements and value propositions, tagged.

- `skills.md` – Categorized technical and core skills.

- `education.md` – Degrees, certifications, and courses.

- `projects.md` – Work and personal projects with tag-based metadata.

- `company-name.md` – Work history, role details, and achievements.

- `resume-layouts/` – Tagged layout files for resume construction.
  - `resume-config.md` – Central configuration (tag, skills layout).

- `resume-views/` – DataviewJS view scripts called by layout files.

- `resume-cmdb/` – Job description files used to populate experience sections.

- `resume.css` – Print-ready styling.

---

## 🚀 Installation

1. Copy the entire `resume-builder` folder into **anywhere** in your Obsidian vault.

2. Open `resume-layouts/resume-config.md` and set your configuration:

```yaml
---
tag: yourtag
skills_layout: 1col
---
```

That's it — no path configuration needed. The builder automatically detects its own location in your vault.

---

## 🚧 Building a Tagged Resume

### 1. Add Your Data

Use tags to mark relevant entries for each resume variant:

```yaml
tags: [ai, frontend]
```

Apply to:

- Skills categories in `skills.md`

- Entries in `projects.md`, `education.md`, and `company-name.md`

- Summaries and value props in `summary.md`

---

### 2. Configure resume-config.md

Open `resume-layouts/resume-config.md` and set the two frontmatter fields:

```yaml
---
tag: yourtag
skills_layout: 1col
---
```

| Field | Description |
|---|---|
| `tag` | The tag used to filter resume content (e.g. `ai`, `data`, `frontend`) |
| `skills_layout` | Skills column layout — `1col` or `2col` |

> **Note:** The base path is resolved automatically from the location of `resume-config.md`. You do not need to set a path manually.

---

### 3. Create a Tagged Resume Layout

#### A. Duplicate the Layout File

Copy the base layout:

`resume-sequential-tag1.md`

Rename it:

`resume-sequential-yourtag.md`

#### B. Update the Layout's DataviewJS

The layout file uses `resume-config` to drive all views:

```javascript
const config = dv.page("resume-config");
const base = config.file.folder.split("/").slice(0, -1).join("/");

await dv.view(`${base}/resume-views/contact`, {});
await dv.view(`${base}/resume-views/valueprop`, {});
await dv.view(`${base}/resume-views/skills`, {});
await dv.view(`${base}/resume-views/brief_experience`, {});
```

The `base` path is derived by stepping one level up from wherever `resume-config.md` lives (`resume-layouts/` → `resume-builder/`), so this works regardless of where the folder is placed in your vault.

---

### 4. Customize the Experience Section

In your experience view, the CMDB folder is resolved the same way:

```javascript
const files = dv.pages(`"${base}/resume-cmdb"`)
  .where(p => p.type === "job_description")
  .map(p => p.file.path)
  .array();
```

Add your work history as `.md` files inside `resume-cmdb/`.

---

### 5. Tag All Content

Ensure every entry in each file includes the correct tag:

```yaml
tags: [yourtag]
```

---

## 🧪 Example: "AI" Resume Variant

1. **Set config:**

```yaml
---
tag: ai
skills_layout: 2col
---
```

2. **Tag your entries:**

```yaml
tags: [ai]
```

3. **Duplicate and rename the layout:**

`resume-sequential-ai.md`

4. **Add company files to `resume-cmdb/`** tagged with `ai`.

5. **Open in Preview mode** to review or print.

---

## 🧠 Tips

- Use simple, intuitive tags (`ai`, `data`, `frontend`).

- Match file names and tags exactly.

- All path resolution is automatic — never edit hardcoded paths.

- Customize `resume.css` for appearance.

- Use Preview mode in Obsidian to print or export your resume.

---

## 🙏 Acknowledgments

This tool was built using [Obsidian](https://obsidian.md) and its powerful [Dataview plugin](https://github.com/blacksmithgu/obsidian-dataview), which enables dynamic, tag-based content rendering.

Dataview is licensed under the MIT License. See [Dataview's License](https://github.com/blacksmithgu/obsidian-dataview/blob/master/LICENSE) for details.

Special thanks to the Obsidian community for fostering such a rich plugin ecosystem.
