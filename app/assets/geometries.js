import { BufferGeometry, BufferAttribute, BoxBufferGeometry, SphereBufferGeometry } from "three"
import { Cache } from "../utils/cache"

const C = new Cache

export function WaveGeometry() {
  return C.fetch('wave', () => {
    const geometry = new BufferGeometry()

    const positions = new Float32Array([
      // Position
      -1.0, -1.0, 0.0,
      -1.0,  1.0, 0.0,
       1.0,  1.0, 0.0,
       1.0, -1.0, 0.0,
    ])

    const texcoords = new Float32Array([
      // UV
      0.0, 0.0,
      0.0, 1.0,
      1.0, 1.0,
      1.0, 0.0,
    ])

    const indices = [
      0, 2, 1, // Triangle 1
      3, 2, 0  // Triangle 2
    ]

    geometry.setIndex(indices)
    geometry.addAttribute('position', new BufferAttribute(positions, 3))
    geometry.addAttribute('uv', new BufferAttribute(texcoords, 2))

    return geometry
  })
}

export function CubeGeometry() {
  return C.fetch('cube', async () => {
    return new BoxBufferGeometry()
  })
}

export function SphereGeometry() {
  return C.fetch('sphere', async () => {
    return new SphereBufferGeometry(1, 10, 10)
  })
}