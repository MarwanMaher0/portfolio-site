import { ref } from 'vue'
import type { GateScene } from '~/components/scene/gates'

const scene = ref<GateScene | null>(null)
/** True when the scene cannot run: no WebGL, reduced motion, or too slow. */
const staticFallback = ref(false)

export function useScene() {
  const setScene = (value: GateScene | null) => { scene.value = value }
  const setFallback = (value: boolean) => { staticFallback.value = value }
  const journey = (value: number) => scene.value?.setJourney(value)
  const opacity = (value: number) => scene.value?.setOpacity(value)
  return { scene, staticFallback, setScene, setFallback, journey, opacity }
}
