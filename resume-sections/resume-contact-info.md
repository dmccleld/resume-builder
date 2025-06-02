```dataviewjs
const c = dv.page("contact-info");

let html = `
<span class="title">
<div class="contact-header-grid">
  <div class="contact-left">
    <h1 class="contact-name">${c.name}</h1>
    <div class="contact-text">
      ${c.location} | ${c.phone} | <a href="mailto:${c.email}">${c.email}</a>
    </div>
  </div>
  <div class="contact-right">
`;

if (c.linkedin) {
  html += `<a href="${c.linkedin}" class="boxed-link">LinkedIn</a>`;
}
if (c.website?.url && c.website?.label) {
  html += `<a href="${c.website.url}" class="boxed-link">${c.website.label}</a>`;
}

html += `</div></div></span>`;
dv.el("div", html);

```