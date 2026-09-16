export type Criterion = { id: string; label: string; weight: number }
export type Option = { id: string; label: string; scores: Record<string, number>; passesMustHave: boolean }
export type Ranked = { id: string; label: string; score: number; excluded: boolean }
export type Verdict = { ranked: Ranked[]; winner: Ranked | null; margin: number; fragile: boolean }

/** Weights normalised to sum 1. All-zero weights fall back to equal weights. */
export function normalise(criteria: Criterion[]): Record<string, number> {
  const total = criteria.reduce((sum, c) => sum + c.weight, 0)
  const out: Record<string, number> = {}
  for (const c of criteria) out[c.id] = total > 0 ? c.weight / total : 1 / criteria.length
  return out
}

export function scoreOption(option: Option, criteria: Criterion[]): number {
  const weights = normalise(criteria)
  return criteria.reduce((sum, c) => sum + weights[c.id]! * (option.scores[c.id] ?? 0), 0)
}

/**
 * Ranks the options. A must-have is a gate, not a weight: when it is on, an
 * option that fails it is excluded from the ranking, however well it scores.
 */
export function rank(options: Option[], criteria: Criterion[], mustHaveOn: boolean, fragileThreshold = 0.15): Verdict {
  const scored = options.map((o) => ({
    id: o.id,
    label: o.label,
    score: Math.round(scoreOption(o, criteria) * 100) / 100,
    excluded: mustHaveOn && !o.passesMustHave,
  }))
  const ranked = [...scored].sort((a, b) => Number(a.excluded) - Number(b.excluded) || b.score - a.score)
  const inPlay = ranked.filter((r) => !r.excluded)
  const winner = inPlay[0] ?? null
  const margin = inPlay.length > 1 ? Math.round((inPlay[0]!.score - inPlay[1]!.score) * 100) / 100 : 0
  return { ranked, winner, margin, fragile: inPlay.length > 1 && margin < fragileThreshold }
}
