import { PlaneBufferGeometry, Geometry, Mesh, RepeatWrapping } from "three"
import { PlaneMaterial } from "../assets/materials"
import { WaveGeometry } from "../assets/geometries"
import { bind } from "lol/dist/esm/function"
import { Framework } from "../framework"
import { texture } from "../utils/loader"

export class Plane {

  constructor({ geometry, material, textures }) {
    bind(this, 'onUpdate', 'onResize')

    this.geometry = geometry
    this.material = material
    this.textures = textures
    this.mesh = new Mesh(geometry, material)
    this.mesh.scale.set(0.5, 0.5, 0.5)

    this.material.uniforms.uNoise.value = this.textures.uNoise

    Framework.configure(this)
  }

  onResize() {
    this.material.uniforms.uResolutionRatio.value = Framework.aspectRatio
  }

  onUpdate() {
    this.material.uniforms.uTime.value = Framework.time
    // this.mesh.rotateY(0.1)
    // console.log(this.mesh.position);
  }

  static async init() {
    const [geometry, material, uNoise] = await Promise.all([
      await WaveGeometry(),
      await PlaneMaterial(),
      await (async function() {
        const t = await texture('images/perlin.jpg')
        t.wrapS = RepeatWrapping
        t.wrapT = RepeatWrapping
        return t
      })()
    ])

    return new Plane({ geometry, material, textures: { uNoise } })
  }

}