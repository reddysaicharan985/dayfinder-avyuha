const assert = require("assert");
const fs = require("fs");
const http = require("http");
const path = require("path");

const root = path.join(__dirname, "..", "dist");
const toolIds = [
  "weekday-finder", "age-calculator", "date-difference", "working-days", "date-add-subtract",
  "weekday-in-month", "countdown", "week-number", "leap-year", "monthly-calendar"
];
const pages = ["index", ...toolIds, "guides", "faq", "about", "privacy"];

for (const page of pages) {
  const filename = `${page}.html`;
  const html = fs.readFileSync(path.join(root, filename), "utf8");
  assert.match(html, /^<!doctype html>/i, `${filename} needs a doctype`);
  assert.match(html, /<title>[^<]+<\/title>/i, `${filename} needs a title`);
  assert.match(html, /<meta name="description"/i, `${filename} needs a description`);
  assert.match(html, /<link rel="canonical"/i, `${filename} needs a canonical URL`);
  assert.match(html, /href="styles\.css"/, `${filename} needs the stylesheet`);
  assert.match(html, /src="app\.js"/, `${filename} needs the app script`);
  if (toolIds.includes(page)) {
    assert.match(html, new RegExp(`data-tool="${page}"`), `${filename} needs its tool ID`);
    assert.match(html, /src="date-core\.js"/, `${filename} needs the date engine`);
  }

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const target = match[1];
    if (/^(?:https?:|#|mailto:)/.test(target)) continue;
    const cleanTarget = target.split("#")[0];
    if (!cleanTarget) continue;
    assert.ok(fs.existsSync(path.join(root, cleanTarget)), `${filename} links to missing ${cleanTarget}`);
  }
}

assert.doesNotThrow(() => JSON.parse(fs.readFileSync(path.join(root, "manifest.webmanifest"), "utf8")));

const mime = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml" };
const server = http.createServer((request, response) => {
  const pathname = request.url === "/" ? "/index.html" : request.url;
  const file = path.join(root, pathname);
  if (!file.startsWith(root) || !fs.existsSync(file)) {
    response.writeHead(404).end("Not found");
    return;
  }
  response.setHeader("Content-Type", mime[path.extname(file)] || "application/octet-stream");
  fs.createReadStream(file).pipe(response);
});

server.listen(0, "127.0.0.1", async () => {
  try {
    const port = server.address().port;
    for (const page of pages) {
      const response = await fetch(`http://127.0.0.1:${port}/${page}.html`);
      assert.equal(response.status, 200, `${page}.html should be served`);
      assert.match(response.headers.get("content-type"), /text\/html/);
    }
    console.log("All DayFinder pages and local asset links passed smoke tests.");
  } finally {
    server.close();
  }
});
