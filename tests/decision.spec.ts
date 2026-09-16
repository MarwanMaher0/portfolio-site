import { describe, expect, it } from 'vitest'
import { rank } from '../app/utils/decision'
import site from '../content/site.json'

const options = site.decisionToy.options as never
const criteria = (weights: number[]) => site.decisionToy.criteria.map((c, i) => ({ ...c, weight: weights[i]! }))
const scoreOf = (result: ReturnType<typeof rank>, id: string) => result.ranked.find((r) => r.id === id)!.score

describe('decision toy', () => {
  it('ranks the default weights, robustly', () => {
    const result = rank(options, criteria([25, 30, 20, 25]), false)
    expect(scoreOf(result, 'buy')).toBe(3.65)
    expect(scoreOf(result, 'build')).toBe(2.85)
    expect(scoreOf(result, 'nothing')).toBe(2.4)
    expect(result.winner?.id).toBe('buy')
    expect(result.margin).toBe(0.8)
    expect(result.fragile).toBe(false)
  })

  it('flags a fragile decision when control is weighted up', () => {
    const result = rank(options, criteria([25, 30, 45, 25]), false)
    expect(scoreOf(result, 'buy')).toBe(3.32)
    expect(scoreOf(result, 'build')).toBe(3.28)
    expect(scoreOf(result, 'nothing')).toBe(2.52)
    expect(result.winner?.id).toBe('buy')
    expect(result.margin).toBe(0.04)
    expect(result.fragile).toBe(true)
  })

  it('flips the winner when control dominates', () => {
    const result = rank(options, criteria([25, 30, 60, 25]), false)
    expect(scoreOf(result, 'build')).toBe(3.46)
    expect(scoreOf(result, 'buy')).toBe(3.18)
    expect(result.winner?.id).toBe('build')
    expect(result.fragile).toBe(false)
  })

  it('excludes an option that fails the must-have', () => {
    const result = rank(options, criteria([25, 30, 20, 25]), true)
    expect(result.winner?.id).toBe('build')
    expect(result.margin).toBe(0.45)
    expect(result.ranked.find((r) => r.id === 'buy')?.excluded).toBe(true)
  })

  it('falls back to equal weights when every weight is zero', () => {
    const result = rank(options, criteria([0, 0, 0, 0]), false)
    expect(scoreOf(result, 'buy')).toBe(3.5)
    expect(scoreOf(result, 'build')).toBe(3)
    expect(scoreOf(result, 'nothing')).toBe(2.5)
    expect(Number.isNaN(result.margin)).toBe(false)
  })
})
