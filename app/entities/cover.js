import { PlaneBufferGeometry, Geometry, Mesh, RepeatWrapping, ShaderMaterial } from "three"
import { PlaneMaterial, MaterialCache } from "../assets/materials"
import { WaveGeometry } from "../assets/geometries"
import { bind } from "lol/dist/esm/function"
import { Framework } from "../framework"
import { texture } from "../utils/loader"
import { load_shader } from "../assets/shaders"

export function CoverMaterial() {
  return MaterialCache.fetch('cover', async () => {
    const shader = await load_shader('shaders/cover.glsl')

    return new ShaderMaterial({
      vertexShader: shader.get('vertex'),
      fragmentShader: shader.get('fragment'),
      transparent: true,
      uniforms: {
        uResolutionRatio: { value: 0.0 },
        uImageRatio: { value: 2040/1102 },
        uNoise: { value: null },
        uCover: { value: null },
        uTime: { value: 0.0 }
      }
    })
  })
}

export class Cover {

  constructor({ geometry, material, textures }) {
    bind(this, 'onUpdate', 'onResize')

    this.geometry = geometry
    this.material = material
    this.textures = textures
    this.mesh = new Mesh(geometry, material)
    this.mesh.scale.set(0.5, 0.5, 0.5)

    this.material.uniforms.uNoise.value = this.textures.uNoise
    this.material.uniforms.uCover.value = this.textures.uCover

    Framework.configure(this)
  }

  onResize() {
    this.material.uniforms.uResolutionRatio.value = Framework.aspectRatio
  }

  onUpdate() {
    this.material.uniforms.uTime.value = Framework.time
  }

  static async init() {
    const [geometry, material, uNoise, uCover] = await Promise.all([
      await WaveGeometry(),
      await CoverMaterial(),
      await (async function() {
        const t = await texture('images/perlin.jpg')
        t.wrapS = RepeatWrapping
        t.wrapT = RepeatWrapping
        return t
      })(),
      await (async function() {
        const t = await texture('images/cover.jpg')
        t.wrapS = RepeatWrapping
        t.wrapT = RepeatWrapping
        return t
      })()
    ])

    return new Cover({ geometry, material, textures: { uNoise, uCover } })
  }

}