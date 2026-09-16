import {
  BufferGeometry, Color, EdgesGeometry, ExtrudeGeometry, Fog, Group, HemisphereLight,
  IcosahedronGeometry, LineBasicMaterial, LineLoop, LineSegments, Mesh, MeshStandardMaterial,
  PerspectiveCamera, PointLight, Scene, Shape, Vector3, WebGLRenderer, DirectionalLight, MathUtils,
} from 'three'

export const PHASE_COLORS = [0x3fd69a, 0xeaf2ec, 0xf2a65a]
const GATE_Z = [0, -4, -8]
/** Journey value at which each gate is passed. */
const PASS_AT = [0.3, 0.52, 0.74]

type Key = { at: number; pos: [number, number, number]; look: [number, number, number] }
/** The camera's path: hero, into gate 1, gate 2, gate 3, then pulled back at contact. */
const KEYS: Key[] = [
  { at: 0.0, pos: [9.5, 3.4, 9.5], look: [-2.6, 0.2, -2] },
  { at: 0.18, pos: [3.4, 2.0, 5.2], look: [0, 0.6, -4] },
  { at: 0.34, pos: [0.5, 0.9, -0.8], look: [0, 0.7, -6] },
  { at: 0.56, pos: [0.4, 0.8, -4.8], look: [0, 0.7, -9] },
  { at: 0.78, pos: [0.3, 0.8, -8.8], look: [0, 0.7, -12] },
  { at: 1.0, pos: [10.5, 3.6, 6.5], look: [-1.4, 0.2, -4.5] },
]

function roundedFrame(w: number, h: number, r: number) {
  const s = new Shape()
  s.moveTo(-w / 2 + r, -h / 2)
  s.lineTo(w / 2 - r, -h / 2); s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r)
  s.lineTo(w / 2, h / 2 - r); s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2)
  s.lineTo(-w / 2 + r, h / 2); s.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r)
  s.lineTo(-w / 2, -h / 2 + r); s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2)
  return s
}

function sampleKeys(p: number) {
  let a = KEYS[0]!, b = KEYS[KEYS.length - 1]!
  for (let i = 0; i < KEYS.length - 1; i++) {
    if (p >= KEYS[i]!.at && p <= KEYS[i + 1]!.at) { a = KEYS[i]!; b = KEYS[i + 1]!; break }
  }
  const span = b.at - a.at || 1
  const t = MathUtils.clamp((p - a.at) / span, 0, 1)
  const ease = t * t * (3 - 2 * t)
  const mix = (x: number, y: number) => MathUtils.lerp(x, y, ease)
  return {
    pos: new Vector3(mix(a.pos[0], b.pos[0]), mix(a.pos[1], b.pos[1]), mix(a.pos[2], b.pos[2])),
    look: new Vector3(mix(a.look[0], b.look[0]), mix(a.look[1], b.look[1]), mix(a.look[2], b.look[2])),
  }
}

export type GateScene = {
  setJourney: (value: number) => void
  setOpacity: (value: number) => void
  setPointer: (x: number, y: number) => void
  resize: () => void
  dispose: () => void
  /** Average frames per second measured over the first frames. */
  fps: () => number
}

export function createGateScene(canvas: HTMLCanvasElement, opts: { mobile?: boolean } = {}): GateScene | null {
  let renderer: WebGLRenderer
  try {
    renderer = new WebGLRenderer({ canvas, antialias: !opts.mobile, alpha: true, powerPreference: 'high-performance' })
  } catch { return null }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, opts.mobile ? 1.5 : 1.75))

  const scene = new Scene()
  scene.fog = new Fog(0x07100d, 9, 30)
  const camera = new PerspectiveCamera(opts.mobile ? 58 : 40, 1, 0.1, 70)

  scene.add(new HemisphereLight(0xeaf2ec, 0x07100d, 0.5))
  const key = new DirectionalLight(0xf2a65a, 1.4); key.position.set(6, 8, 6); scene.add(key)
  const rim = new PointLight(0x3fd69a, 30, 30); rim.position.set(-4, 4, -12); scene.add(rim)

  const outer = roundedFrame(2.4, 3.2, 0.5)
  outer.holes.push(roundedFrame(1.6, 2.4, 0.3))
  const gateGeo = new ExtrudeGeometry(outer, {
    depth: 0.3, bevelEnabled: true, bevelSize: 0.04, bevelThickness: 0.04, bevelSegments: 3,
    curveSegments: opts.mobile ? 10 : 16,
  })
  gateGeo.center()
  const edgeGeo = new EdgesGeometry(gateGeo, 30)

  const gates = PHASE_COLORS.map((color, i) => {
    const material = new MeshStandardMaterial({ color: 0x15261f, roughness: 0.55, metalness: 0.25, emissive: color, emissiveIntensity: 0.02 })
    const edges = new LineSegments(edgeGeo, new LineBasicMaterial({ color, transparent: true, opacity: 0.15 }))
    const group = new Group()
    group.add(new Mesh(gateGeo, material), edges)
    group.position.z = GATE_Z[i]!
    scene.add(group)
    return { group, material, edge: edges.material as LineBasicMaterial }
  })

  const ground = new Group()
  for (let k = 1; k <= (opts.mobile ? 5 : 9); k++) {
    const points = roundedFrame(2 + k * 1.6, 6 + k * 1.8, 0.8 + k * 0.4).getPoints(24).map((p) => new Vector3(p.x, 0, p.y))
    ground.add(new LineLoop(new BufferGeometry().setFromPoints(points), new LineBasicMaterial({ color: 0x244036, transparent: true, opacity: 1 - k / 11 })))
  }
  ground.position.set(0, -1.7, -4)
  scene.add(ground)

  const token = new Mesh(
    new IcosahedronGeometry(0.3, 1),
    new MeshStandardMaterial({ color: 0x0e1a16, emissive: 0x3fd69a, emissiveIntensity: 1.6, flatShading: true }),
  )
  const tokenLight = new PointLight(0x3fd69a, 14, 6)
  token.add(tokenLight)
  scene.add(token)

  const green = new Color(0x3fd69a), amber = new Color(0xf2a65a), tmp = new Color()
  let journeyTarget = 0, journey = 0
  let opacityTarget = 0, opacity = 0
  const pointer = { x: 0, y: 0 }, look = { x: 0, y: 0 }
  let frames = 0, elapsed = 0, last = performance.now(), raf = 0, disposed = false

  const resize = () => {
    const w = canvas.clientWidth || window.innerWidth
    const h = canvas.clientHeight || window.innerHeight
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.fov = w < 700 ? 58 : 40
    camera.updateProjectionMatrix()
  }
  resize()

  const frame = () => {
    if (disposed) return
    raf = requestAnimationFrame(frame)
    const now = performance.now()
    const delta = now - last
    last = now
    opacity += (opacityTarget - opacity) * 0.08
    canvas.style.opacity = String(Math.max(0, Math.min(1, opacity)))
    if (opacity < 0.02 && opacityTarget < 0.02) return
    if (frames < 90) { frames++; elapsed += delta }

    journey += (journeyTarget - journey) * 0.08
    look.x += (pointer.x - look.x) * 0.06
    look.y += (pointer.y - look.y) * 0.06

    const { pos, look: target } = sampleKeys(journey)
    camera.position.set(pos.x + look.x * 1.2, pos.y - look.y * 0.7, pos.z)
    camera.lookAt(target)

    // The token runs just ahead of the camera, and rests inside the Learn gate at the end.
    const tokenZ = journey >= 0.95 ? GATE_Z[2]! : MathUtils.lerp(3.5, -9.5, MathUtils.clamp((journey - 0.16) / 0.74, 0, 1))
    token.position.set(0, 0.6 + Math.sin(journey * 8) * 0.08, tokenZ)
    token.rotation.set(journey * 8, journey * 11, 0)
    token.visible = journey > 0.08
    tmp.copy(green).lerp(amber, MathUtils.clamp((journey - 0.2) / 0.6, 0, 1))
    ;(token.material as MeshStandardMaterial).emissive.copy(tmp)
    tokenLight.color.copy(tmp)

    gates.forEach((gate, i) => {
      const lit = MathUtils.clamp((journey - PASS_AT[i]! + 0.12) / 0.12, 0, 1)
      gate.material.emissiveIntensity = 0.02 + lit * 0.14
      gate.edge.opacity = 0.15 + lit * 0.85
    })

    renderer.render(scene, camera)
  }
  raf = requestAnimationFrame(frame)

  return {
    setJourney: (value) => { journeyTarget = MathUtils.clamp(value, 0, 1) },
    setOpacity: (value) => { opacityTarget = MathUtils.clamp(value, 0, 1) },
    setPointer: (x, y) => { pointer.x = x; pointer.y = y },
    resize,
    fps: () => (elapsed > 0 ? (frames / elapsed) * 1000 : 60),
    dispose: () => {
      disposed = true
      cancelAnimationFrame(raf)
      gateGeo.dispose(); edgeGeo.dispose(); renderer.dispose()
    },
  }
}
