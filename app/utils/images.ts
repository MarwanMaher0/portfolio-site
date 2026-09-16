import manifest from '~~/content/_image-manifest.json'

type Variant = { src: string; width: number; height: number }
const index = new Map<string, Variant[]>()

for (const value of Object.values(manifest as Record<string, unknown>)) {
  if (Array.isArray(value) && value.length && 'variants' in (value[0] as object)) {
    for (const entry of value as { variants: Variant[] }[]) index.set(entry.variants[0]!.src, entry.variants)
  } else if (Array.isArray(value) && value.length && 'src' in (value[0] as object)) {
    const variants = value as Variant[]
    index.set(variants[0]!.src, variants)
  }
}

/** Exact dimensions and a srcset for one image, taken from the manifest. */
export function image(src: string) {
  const variants = index.get(src)
  const base = variants?.[0]
  return {
    src,
    srcset: variants && variants.length > 1 ? variants.map((v) => `${v.src} ${v.width}w`).join(', ') : undefined,
    width: base?.width,
    height: base?.height,
  }
}
