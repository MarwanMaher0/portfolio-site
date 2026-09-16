import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import projects from '../../content/projects.json' with { type: 'json' }

const slugs = [...projects.featured, ...projects.more].map((p) => p.slug)

test('the one-page story loads with no console errors and no sideways scroll', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()) })
  const failed: string[] = []
  page.on('response', (response) => { if (response.status() >= 400) failed.push(`${response.status()} ${response.url()}`) })

  await page.goto('/')
  await expect(page.locator('h1')).toContainText('Marwan')
  await expect(page.locator('.hero__img')).toBeVisible()
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(1200)

  expect(errors).toEqual([])
  expect(failed).toEqual([])
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true)
})

test('the decision toy reranks and flags a fragile decision', async ({ page }) => {
  await page.goto('/')
  const toy = page.locator('.toy')
  await toy.scrollIntoViewIfNeeded()
  await expect(toy).toHaveAttribute('data-hydrated', 'true')
  await expect(toy.locator('.toy__row').first()).toContainText('Buy a hosted service')

  const control = toy.locator('input[type=range]').nth(2)
  await control.fill('60')
  await page.waitForTimeout(800)
  await expect(toy.locator('.toy__row').first()).toContainText('Build in-house')

  await control.fill('45')
  await page.waitForTimeout(800)
  await expect(toy.locator('.toy__verdict')).toContainText('Fragile')
})

test('every case study renders its content', async ({ page }) => {
  for (const slug of slugs) {
    await page.goto(`/work/${slug}/`)
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('.case__did li').first()).toBeVisible()
  }
})

// Checked with reduced motion so axe sees the settled page, not a frame mid-animation.
test.describe('accessibility', () => {
  test.use({ reducedMotion: 'reduce' })
  test('no serious violations', async ({ page }) => {
  await page.goto('/')
  await page.waitForTimeout(600)
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
  const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
  expect(serious.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([])
  })
})

test('the page height does not grow as lazy sections hydrate', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  const early = await page.evaluate(() => document.documentElement.scrollHeight)
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.5))
  await page.waitForTimeout(1500)
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(1500)
  const late = await page.evaluate(() => document.documentElement.scrollHeight)
  expect(Math.abs(late - early)).toBeLessThan(200)
})

test('the lightbox traps focus and closes with Escape', async ({ page }) => {
  await page.goto('/work/ipora')
  await page.locator('.case__shotButton').first().click()
  await expect(page.locator('.lightbox')).toBeVisible()
  expect(await page.evaluate(() => document.querySelector('.lightbox')?.contains(document.activeElement))).toBe(true)
  for (let i = 0; i < 8; i++) await page.keyboard.press('Tab')
  expect(await page.evaluate(() => document.querySelector('.lightbox')?.contains(document.activeElement))).toBe(true)
  await page.keyboard.press('Escape')
  await expect(page.locator('.lightbox')).toHaveCount(0)
})

test('the contact headline renders its text', async ({ page }) => {
  await page.goto('/')
  const headline = page.locator('.contact__headline')
  await expect(headline).toContainText("Let's build the next one.")
})

test('search and answer engines get the files they look for', async ({ page }) => {
  for (const [path, needle] of [['/robots.txt', 'Sitemap:'], ['/sitemap.xml', '/work/ipora'], ['/llms.txt', 'Technical Project Manager']]) {
    const response = await page.request.get(path)
    expect(response.status(), path).toBe(200)
    expect(await response.text(), path).toContain(needle)
  }
})
