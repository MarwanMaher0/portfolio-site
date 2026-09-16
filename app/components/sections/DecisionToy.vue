<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import site from '~~/content/site.json'
import { rank, type Criterion } from '~/utils/decision'
import { canAnimate, loadGsap } from '~/composables/useMotion'

const data = site.decisionToy
const criteria = ref<Criterion[]>(data.criteria.map((c) => ({ ...c })))
const mustHaveOn = ref(false)
const list = ref<HTMLElement | null>(null)

const verdict = computed(() => rank(data.options as never, criteria.value, mustHaveOn.value, data.fragileThreshold))
const announcement = computed(() => verdict.value.winner
  ? `Winner: ${verdict.value.winner.label}, margin ${verdict.value.margin.toFixed(2)}, ${verdict.value.fragile ? 'fragile' : 'robust'}`
  : '')

/** Reorders the bars with Flip so the ranking change is visible. */
watch(() => verdict.value.ranked.map((r) => r.id).join(','), async () => {
  if (!canAnimate() || !list.value) return
  const { gsap, Flip } = await loadGsap()
  const state = Flip.getState(list.value.querySelectorAll('[data-row]'))
  await nextTick()
  Flip.from(state, { duration: 0.5, ease: 'power3.out', absolute: true })
  gsap.fromTo(list.value.querySelectorAll('[data-row]'), { opacity: 0.85 }, { opacity: 1, duration: 0.3 })
})
</script>

<template>
  <div class="toy container">
    <div class="toy__controls">
      <p class="mono">{{ data.example }}</p>
      <h3 class="toy__title h2">{{ data.title }}</h3>
      <p class="measure">{{ data.intro }}</p>

      <div class="toy__sliders">
        <label v-for="criterion in criteria" :key="criterion.id" class="toy__slider">
          <span class="toy__sliderHead">
            <span class="mono">{{ criterion.label }}</span>
            <span class="mono num">{{ criterion.weight }}</span>
          </span>
          <input
            v-model.number="criterion.weight" type="range" min="0" max="60" step="1"
            :aria-label="`${criterion.label} weight`" :aria-valuetext="`${criterion.label}, weight ${criterion.weight}`"
            data-cursor="Drag"
          >
        </label>
        <p class="toy__hint mono">Try pushing Control above 45.</p>
      </div>

      <div class="toy__must">
        <button
          class="toy__switch" type="button" role="switch" :aria-checked="mustHaveOn" :aria-label="data.mustHave.label"
          data-cursor="Flip" @click="mustHaveOn = !mustHaveOn"
        >
          <span class="toy__knob" />
        </button>
        <div>
          <p class="toy__mustLabel">{{ data.mustHave.label }}</p>
          <p class="toy__mustText">{{ data.mustHave.explain }}</p>
        </div>
      </div>
    </div>

    <div class="toy__results">
      <ul ref="list" class="toy__list">
        <li
          v-for="row in verdict.ranked" :key="row.id" class="toy__row card"
          :class="{ 'is-winner': verdict.winner?.id === row.id, 'is-excluded': row.excluded }" data-row
        >
          <span class="toy__option">
            {{ row.label }}
            <span v-if="verdict.winner?.id === row.id" class="chip chip--accent toy__tag">Winner</span>
            <span v-else-if="row.excluded" class="chip toy__tag">Fails must-have</span>
          </span>
          <span class="toy__bar"><span class="toy__fill" :style="{ transform: `scaleX(${row.score / 5})` }" /></span>
          <span class="toy__score num">{{ row.score.toFixed(2) }}</span>
        </li>
      </ul>

      <p class="toy__verdict">
        <span class="chip" :class="verdict.fragile ? 'toy__fragile' : 'chip--accent'">
          {{ verdict.fragile ? data.fragileLabel : data.robustLabel }}
        </span>
        <span class="mono num">margin {{ verdict.margin.toFixed(2) }}</span>
      </p>
      <p class="visually-hidden" aria-live="polite">{{ announcement }}</p>
      <p class="mono toy__foot">{{ data.footnote }}</p>
      <a class="toy__cta" :href="data.cta.href" target="_blank" rel="noopener" data-cursor="Open">{{ data.cta.label }} →</a>
    </div>
  </div>
</template>

<style scoped>
.toy { display: grid; grid-template-columns: 5fr 7fr; gap: clamp(28px, 4vw, 64px); align-items: start; }
.toy__controls { display: flex; flex-direction: column; gap: 18px; }
.toy__title { max-width: 14ch; }
.toy__sliders { display: flex; flex-direction: column; gap: 16px; margin-top: 8px; }
.toy__sliderHead { display: flex; justify-content: space-between; margin-bottom: 8px; }
.toy__slider input { -webkit-appearance: none; appearance: none; width: 100%; height: 4px; border-radius: 2px; background: var(--line); }
.toy__slider input::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: var(--accent); border: 2px solid var(--bg); cursor: pointer; }
.toy__slider input::-moz-range-thumb { width: 18px; height: 18px; border-radius: 50%; background: var(--accent); border: 2px solid var(--bg); cursor: pointer; }
.toy__hint { text-transform: none; }
.toy__must { display: flex; gap: 14px; align-items: flex-start; border-top: 1px solid var(--line); padding-top: 20px; }
.toy__switch { width: 46px; height: 26px; border-radius: var(--radius-pill); background: var(--line); position: relative; flex: none; transition: background var(--dur-base); }
.toy__switch[aria-checked='true'] { background: var(--accent); }
.toy__knob { position: absolute; top: 3px; left: 3px; width: 20px; height: 20px; border-radius: 50%; background: var(--ink); transition: transform var(--dur-base) var(--ease-out); }
.toy__switch[aria-checked='true'] .toy__knob { transform: translateX(20px); background: var(--bg); }
.toy__mustLabel { font-weight: 500; font-size: 14px; }
.toy__mustText { font-size: 13px; color: var(--ink-3); margin-top: 4px; }
.toy__list { display: flex; flex-direction: column; gap: 12px; }
.toy__row { display: grid; grid-template-columns: minmax(150px, 1fr) minmax(80px, 2fr) auto; gap: 18px; align-items: center; padding: 18px 22px; }
.toy__row.is-winner { border-color: color-mix(in srgb, var(--accent) 55%, transparent); box-shadow: 0 0 0 1px color-mix(in srgb, var(--accent) 30%, transparent); }
.toy__row.is-excluded { opacity: 0.45; }
.toy__option { display: flex; flex-direction: column; gap: 8px; align-items: flex-start; font-weight: 500; }
.toy__tag { font-size: 10px; padding: 3px 9px; }
.toy__bar { height: 8px; border-radius: 4px; background: var(--line); overflow: hidden; }
.toy__fill { display: block; height: 100%; background: var(--ink-2); transform-origin: left; transition: transform var(--dur-base) var(--ease-out); }
.is-winner .toy__fill { background: var(--accent); }
.toy__score { font-family: var(--font-display); font-size: 1.5rem; }
.toy__verdict { display: flex; align-items: center; gap: 14px; margin-top: 20px; }
.toy__fragile { border-color: color-mix(in srgb, var(--accent-2) 55%, transparent); color: var(--accent-2); }
.toy__foot { text-transform: none; margin-top: 16px; }
.toy__cta { display: inline-block; margin-top: 14px; color: var(--accent); font-weight: 500; }
@media (max-width: 900px) { .toy { grid-template-columns: 1fr; } .toy__row { grid-template-columns: 1fr auto; } .toy__bar { grid-column: 1 / -1; } }
</style>
