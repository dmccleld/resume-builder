# resume-builder
# 🧾 Obsidian Resume Builder Guide

This guide explains how to use and extend the Obsidian-based Resume Builder powered by DataviewJS. It enables you to build tailored resumes using a modular and tag-based approach.

---

## 📁 File Overview

Your vault includes the following key files:

- `contact-info.md` – Basic personal information.
- `summary.md` – Contains summary and value proposition entries, each tagged for resume variants.
- `skills.md` – Lists your skills across categories, tagged for filtering.
- `education.md` – Educational history including degrees, courses, and certifications.
- `projects.md` – Personal and professional projects, with tags.
- `company-name.md`, etc. – Experience roles and achievements grouped per company.
- `resume-*.md` – Layout templates that assemble the resume components.
- `resume.css` – Provides clean styling for print and preview.

---

## 🚧 How to Build a Tagged Resume

### 1. Enter Your Data

In the main content files, each entry should include appropriate tags:

```yaml
tags: [ai, frontend]
```

Update these files:
- `skills.md` (under `applications`, `programming`, `technologies`, `dbms`, `systems`, `core`)
- `projects.md` (each project)
- `education.md` (degrees, courses, certifications)
- `company-name.md` (roles and bullets)
- `summary.md` (both `summaries` and `valueprop`)

---

### 2. Create a New Resume Variant

#### A. Duplicate a Layout File

Choose a layout like:
```plaintext
resume-portfolio-tag1.md
```

Duplicate it and rename to:
```plaintext
resume-portfolio-yourtag.md
```

#### B. Duplicate Component Files

Duplicate all `DataviewJS` files, and update the filenames to reflect your tag:

```plaintext
resume-summary-tag1.md     → resume-summary-yourtag.md
resume-skills-tag1.md      → resume-skills-yourtag.md
resume-projects-tag1.md    → resume-projects-yourtag.md
resume-experience-tag1.md  → resume-experience-yourtag.md
resume-education-tag1.md   → resume-education-yourtag.md
```

#### C. Update Layout File Embeds

In `resume-portfolio-yourtag.md`, update the embedded references to:

```markdown
![[resume-contact-info]]
![[resume-summary-yourtag]]
![[resume-skills-yourtag]]
![[resume-projects-yourtag]]
![[resume-experience-yourtag]]
![[resume-education-yourtag]]
```

---

### 3. Update DataviewJS in Each Section

#### A. Tag Extraction

Ensure every `resume-*-yourtag.md` file includes the following logic:

```javascript
const tag = dv.current().file.name.split("-")[2] ?? "general";
```

This auto-detects the tag from the filename.

#### B. Experience Files List

In `resume-experience-yourtag.md`, locate this line:

```javascript
const files = ["company-name"];
```

Update it to include all company files you want to source experience from, like:

```javascript
const files = ["company-abc", "company-def"];
```

Leave out the `.md` extension.

---

### 4. Tag Your Data

Ensure all data entries (skills, projects, education, experience) are tagged to match the tag you used in your layout and section filenames.

Example:
```yaml
tags: [ai]
```

---

## 🧪 Example: Creating an “AI” Resume

1. **Tag your entries:**
   - In all content files, use:
     ```yaml
     tags: [ai]
     ```

2. **Create the files:**
   - `resume-portfolio-ai.md`
   - `resume-summary-ai.md`
   - `resume-skills-ai.md`
   - `resume-projects-ai.md`
   - `resume-experience-ai.md`
   - `resume-education-ai.md`

3. **Update experience section to include correct file names:**
   ```javascript
   const files = ["company-openai", "company-google"];
   ```

4. **Embed files in layout:**
   ```markdown
   ![[resume-contact-info]]
   ![[resume-summary-ai]]
   ![[resume-skills-ai]]
   ![[resume-projects-ai]]
   ![[resume-experience-ai]]
   ![[resume-education-ai]]
   ```

5. **Preview in Obsidian**  
   Use Preview mode and print to PDF for export.

---

## 🖼 Tips

- Use simple tags like `ai`, `data`, `frontend` for clarity.
- Ensure all `.md` files are correctly named and tags match.
- Update `resume.css` to customize your resume appearance for screen and print.
- You can add or remove embedded sections based on your resume needs.

---
