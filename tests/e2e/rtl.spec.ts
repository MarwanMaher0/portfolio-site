import { expect, test } from '@playwright/test'
import site from '../../content/site.json' with { type: 'json' }

/** Reads the value's characters left to right by their on-screen position. */
const VISUAL_ORDER = `(el) => {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
  const chars = []
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    for (let i = 0; i < node.data.length; i++) {
      const range = document.createRange()
      range.setStart(node, i); range.setEnd(node, i + 1)
      chars.push([range.getBoundingClientRect().left, node.data[i]])
    }
  }
  return chars.sort((a, b) => a[0] - b[0]).map((c) => c[1]).join('')
}`

// Without isolation the browser really does reorder these four values.
const BROKEN = ['2024-05-12', '6789 2345 010', 'B-4821#', '5-3']

test.describe('Arabic lab', () => {
  test('shows the real bidi bug, and the switch really fixes it', async ({ page }) => {
    await page.goto('/')
    const lab = page.locator('#rtl')
    await lab.scrollIntoViewIfNeeded()
    await expect(lab).toHaveAttribute('data-hydrated', 'true')
    const values = lab.locator('.lab__value')
    await expect(values).toHaveCount(site.rtlLab.samples.length)

    // Force the "as most sites render it" state, whatever the auto-flip did.
    const isolated = await lab.locator('.lab__switch').getAttribute('aria-checked')
    if (isolated === 'true') await lab.locator('.lab__switch').click()
    await page.waitForTimeout(900)

    for (let i = 0; i < BROKEN.length; i++) {
      expect(await values.nth(i).evaluate(eval(`(${VISUAL_ORDER})`))).toBe(BROKEN[i])
    }

    await lab.locator('.lab__switch').click()
    await page.waitForTimeout(900)
    for (let i = 0; i < site.rtlLab.samples.length; i++) {
      expect(await values.nth(i).evaluate(eval(`(${VISUAL_ORDER})`))).toBe(site.rtlLab.samples[i]!.value)
    }
  })
})
