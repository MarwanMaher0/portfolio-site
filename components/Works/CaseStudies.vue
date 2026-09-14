<template>
  <section id="Work" class="work section-padding">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8 col-md-10">
          <div class="sec-head text-center">
            <h6 class="wow fadeIn" data-wow-delay=".5s">Work</h6>
            <h3 class="wow color-font">Seven systems, 2022 to now.</h3>
          </div>
        </div>
      </div>

      <div class="cs-grid">
        <article v-for="cs in studies" :key="cs.slug" :id="`work-${cs.slug}`" class="cs-card">
          <div class="cs-visual" :style="{ background: cs.gradient }">
            <img v-if="shotFor(cs.slug)" :src="shotFor(cs.slug)" :alt="`${cs.short} screenshot`" loading="lazy" />
            <div v-else class="cs-placeholder">
              <span class="cs-placeholder-name">{{ cs.short }}</span>
              <span class="cs-placeholder-dates">{{ cs.dates }}</span>
            </div>
          </div>

          <div class="cs-body">
            <p class="cs-meta">{{ cs.role }} · {{ cs.dates }}</p>
            <h4 class="cs-title">{{ cs.title }}</h4>

            <p v-if="cs.outcome" class="cs-outcome"><span class="cs-label">Outcome</span>{{ cs.outcome }}</p>
            <p v-if="!cs.problem" class="cs-did"><span class="cs-label">What I did</span>{{ cs.did }}</p>

            <ul class="cs-stack" aria-label="Stack">
              <li v-for="s in cs.stack" :key="s">{{ s }}</li>
            </ul>

            <div class="cs-actions">
              <button v-if="cs.problem" type="button" class="cs-toggle" :aria-expanded="isOpen(cs.slug) ? 'true' : 'false'"
                :aria-controls="`cs-details-${cs.slug}`" @click="toggle(cs.slug)">
                {{ isOpen(cs.slug) ? 'Hide the case study' : 'Read the case study' }}
                <span class="cs-chevron" :class="{ open: isOpen(cs.slug) }" aria-hidden="true"></span>
              </button>
              <a v-if="cs.link" :href="cs.link.url" class="cs-link" target="_blank" rel="noopener">
                {{ cs.link.label }} <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div v-if="cs.problem" v-show="isOpen(cs.slug)" :id="`cs-details-${cs.slug}`" class="cs-details">
              <dl>
                <dt>Problem</dt>
                <dd>{{ cs.problem }}</dd>
                <dt>What I did</dt>
                <dd>{{ cs.did }}</dd>
                <template v-if="cs.outcome">
                  <dt>Outcome</dt>
                  <dd>{{ cs.outcome }}</dd>
                </template>
              </dl>
            </div>
          </div>
        </article>
      </div>
    </div>
    <div class="line bottom right"></div>
  </section>
</template>

<script setup>
import { reactive } from 'vue';
import studies from '@/data/case-studies.json';

// Screenshot detection happens at build time: any file matching public/work/<slug>.(png|jpg|jpeg|webp)
// is picked up by Vite's glob, so the card shows the image if it exists and the gradient otherwise.
const shots = import.meta.glob('/public/work/*.{png,jpg,jpeg,webp}');
const shotFor = (slug) => {
  const match = Object.keys(shots).find((p) => /\/public\/work\/([^/]+)\.(png|jpe?g|webp)$/.test(p) && p.split('/').pop().replace(/\.(png|jpe?g|webp)$/, '') === slug);
  return match ? match.replace(/^\/public/, '') : null;
};

const open = reactive({});
const isOpen = (slug) => !!open[slug];
const toggle = (slug) => { open[slug] = !open[slug]; };
</script>

<style>
.work {
  position: relative;
}

.cs-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 30px;
  align-items: start;
}

.cs-card {
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  overflow: hidden;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.cs-card:hover {
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.cs-visual {
  position: relative;
  aspect-ratio: 16 / 7;
  max-width: 100%;
  overflow: hidden;
}

.cs-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.cs-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 22px 26px;
  color: #fff;
  background-image: radial-gradient(rgba(255, 255, 255, 0.18) 1px, transparent 1px);
  background-size: 18px 18px;
}

.cs-placeholder-name {
  font-size: 30px;
  font-weight: 600;
  letter-spacing: 0.5px;
  line-height: 1.1;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.cs-placeholder-dates {
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  opacity: 0.85;
  margin-top: 4px;
}

.cs-body {
  padding: 26px 28px 28px;
}

.cs-meta {
  font-size: 12px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #777;
  margin-bottom: 8px;
}

.cs-title {
  font-size: 22px;
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: 14px;
}

.cs-label {
  display: block;
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 4px;
}

.cs-outcome,
.cs-did {
  font-size: 15px;
  line-height: 1.7;
  color: #222;
  margin-bottom: 16px;
}

.cs-outcome {
  font-weight: 500;
}

.cs-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0 0 18px;
  padding: 0;
}

.cs-stack li {
  font-size: 12px;
  padding: 5px 11px;
  border-radius: 999px;
  background: #f3f4f6;
  color: #333;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.cs-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 22px;
}

.cs-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: 0;
  padding: 0;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  color: #111;
  cursor: pointer;
}

.cs-toggle:hover,
.cs-link:hover {
  text-decoration: underline;
}

.cs-chevron {
  width: 8px;
  height: 8px;
  border-right: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
  transform: rotate(45deg) translateY(-2px);
  transition: transform 0.25s ease;
}

.cs-chevron.open {
  transform: rotate(-135deg) translateY(-2px);
}

.cs-link {
  font-size: 14px;
  font-weight: 500;
  color: #6b21a8;
}

.cs-details {
  margin-top: 22px;
  padding-top: 22px;
  border-top: 1px dashed rgba(0, 0, 0, 0.12);
}

.cs-details dl {
  margin: 0;
}

.cs-details dt {
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 4px;
}

.cs-details dd {
  font-size: 15px;
  line-height: 1.7;
  color: #222;
  margin: 0 0 16px;
}

.cs-details dd:last-child {
  margin-bottom: 0;
}

@media screen and (max-width: 991px) {
  .cs-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media screen and (max-width: 480px) {
  .cs-body {
    padding: 20px 18px 22px;
  }

  .cs-title {
    font-size: 19px;
  }
}
</style>
