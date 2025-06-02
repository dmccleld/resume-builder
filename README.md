# resume-builder
# 🧾 Obsidian Resume Builder Guide

This guide helps you create customized resumes using Obsidian and DataviewJS, leveraging tags to filter relevant content dynamically.

---

## 🔧 Prerequisites

Before you begin using this resume builder, ensure you have the following:

- **Obsidian**: Installed and set up with a vault.
    
- **Dataview Plugin**: Installed and enabled in Obsidian.
    
- **Basic YAML Knowledge**: Comfort with editing frontmatter and markdown.
    
- **Folder Structure**: Store all resume-related files (e.g., `contact-info.md`, `skills.md`) in the same vault folder or appropriately linked structure.
    
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
    
- `resume-*.md` – Tagged templates for resume construction.
    
- `resume.css` – Print-ready styling.
    

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

### 2. Create a Tagged Resume Layout

#### A. Duplicate the Layout File

Copy a base layout:

`resume-sequential-tag1.md`

Rename it:

`resume-sequential-yourtag.md`

#### B. Duplicate Section Files

Create section-specific files:

```
resume-summary-yourtag.md
resume-skills-yourtag.md
resume-projects-yourtag.md
resume-experience-yourtag.md
resume-education-yourtag.md
```


Each should include logic to detect the tag from the filename:

`const tag = dv.current().file.name.split("-")[2] ?? "general";`

#### C. Update Layout References

In `resume-sequential-yourtag.md`:

```markdown
![[resume-contact-info]]
![[resume-summary-yourtag]]
![[resume-skills-yourtag]]
![[resume-projects-yourtag]]
![[resume-experience-yourtag]]
![[resume-education-yourtag]]
```
---

### 3. Customize the Experience Section

In `resume-experience-yourtag.md`, define which company files to include:

`const files = ["company-name", "company-other"];`

---

### 4. Tag All Content

Ensure every entry in each file includes the correct tag:

`tags: [yourtag]`

---

## 🧪 Example: “AI” Resume Variant

1. **Tag Entries:**
    
`tags: [ai]`

2. **Create Files:**
    
- `resume-sequential-ai.md`
    
- `resume-summary-ai.md`
    
- `resume-skills-ai.md`
    
- `resume-projects-ai.md`
    
- `resume-experience-ai.md`
    
- `resume-education-ai.md`
    

3. **Reference Companies:**
    
`const files = ["company-openai", "company-google"];`

4. **Embed Sections in Layout:**
    
```markdown
![[resume-contact-info]]
![[resume-summary-ai]]
![[resume-skills-ai]]
![[resume-projects-ai]]
![[resume-experience-ai]]
![[resume-education-ai]]
```
---

## 🧠 Tips

- Use simple, intuitive tags (`ai`, `data`, `frontend`).
    
- Match file names and tags exactly.
    
- Customize `resume.css` for appearance.
    
- Use Preview mode in Obsidian to print or export your resume.