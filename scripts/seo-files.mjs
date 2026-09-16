/**
 * Writes sitemap.xml and llms.txt into the generated site, straight from the
 * content files, so they can never drift from the pages that actually exist.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const out = join(root, '.output/public')
const read = (file) => JSON.parse(readFileSync(join(root, 'content', file), 'utf8'))

const site = read('site.json')
const projects = read('projects.json')
const oss = read('open-source.json')
const base = site.person.siteUrl
const all = [...projects.featured, ...projects.more]
const today = new Date().toISOString().slice(0, 10)

const urls = [
  { loc: `${base}/`, priority: '1.0' },
  ...all.map((project) => ({ loc: `${base}/work/${project.slug}`, priority: '0.8' })),
]

writeFileSync(join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ loc, priority }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>
`)

const line = (project) => `- [${project.title}: ${project.subtitle}](${base}/work/${project.slug}): ${project.summary}`

writeFileSync(join(out, 'llms.txt'), `# ${site.person.name}

> ${site.person.role}. ${site.hero.sub}

- Location: ${site.person.location}. ${site.person.availability}. Timezone ${site.person.timezone}.
- Languages: ${site.person.languages.join(', ')}.
- Education: ${site.person.education}.
- Contact: ${site.person.email}, ${site.person.phone}.
- Elsewhere: ${site.person.linkedin}, ${site.person.github}.

## Work

${all.map(line).join('\n')}

## Open source

${oss.tools.map((tool) => `- [${tool.name}](${tool.links[tool.links.length - 1].href}): ${tool.tagline} ${tool.stack.join(', ')}. ${tool.tests}.`).join('\n')}

## How he works

${site.principles.items.map((item) => `- ${item.title} ${item.body}`).join('\n')}

## CVs

${site.cv.map((cv) => `- [${cv.label}](${base}${cv.file}): ${cv.hint}`).join('\n')}
`)

console.log('wrote sitemap.xml and llms.txt')
