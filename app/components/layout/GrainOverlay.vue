<template>
  <svg class="grain" aria-hidden="true">
    <filter id="grain-noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
    </filter>
    <rect width="100%" height="100%" filter="url(#grain-noise)" />
  </svg>
</template>
