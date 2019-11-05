import { MeshBasicMaterial, Mesh, PlaneBufferGeometry, RepeatWrapping, PixelFormat, RGBAFormat } from "three";
import { PlaneGeometry } from "../../assets/geometries";
import { WaveMaterial } from "../../assets/materials";
import { Framework } from "../../framework";
import { texture } from "../../utils/loader";

export class Wave {

  constructor({ geometry, material, textures }) {
    this.onUpdate = this.onUpdate.bind(this)
    this.onResize = this.onResize.bind(this)

    this.geometry = geometry
    this.material = material
    this.textures = textures

    this.mesh = new Mesh(this.geometry, this.material)
    this.ratio = Framework.width / Framework.height

    Framework.configure(this)
  }

  onResize() {
    this.ratio = Framework.width / Framework.height
  }

  onUpdate() {
    this.material.uniforms.uResolutionRatio.value = this.ratio
    this.material.uniforms.uNoise.value = this.textures.uNoise
    this.material.uniforms.uTime.value = Framework.time
  }

  static async init() {
    return new Wave({
      geometry: await PlaneGeometry(),
      material: await WaveMaterial(),
      textures: {
        uNoise: await (async function() {
          const t = await texture('images/perlin.jpg')
          t.wrapS = RepeatWrapping
          t.wrapT = RepeatWrapping
          t.format = RGBAFormat
          return t
        })()
      }
    })
  }

}