import { Mesh, RepeatWrapping, RGBAFormat, Color } from "three";
import { WaveGeometry } from "../assets/geometries";
import { WaveMaterial } from "../assets/materials";
import { Framework } from "../framework";
import { texture } from "../utils/loader";
import { bind } from "lol/dist/esm/function";

export class Wave {

  constructor({ geometry, material, textures }) {
    bind(this, 'onResize', 'onUpdate')

    this.geometry = geometry
    this.material = material
    this.textures = textures
    this.uniforms = this.material.uniforms
    this.uniforms.uNoise.value = this.textures.uNoise
    this.color = new Color()
    this.color.setHex(0x2d9d9d)

    this.mesh = new Mesh(this.geometry, this.material)

    Framework.configure(this)
  }

  /**
   *
   * @param {dat.GUI} GUI
   */
  onDebug(GUI) {
    GUI.addColor({ color: 0x2d9d9d }, 'color').onChange((v) => {
      this.color.setHex(v)
    })
  }

  onResize() {
    this.uniforms.uResolutionRatio.value = Framework.width / Framework.height
  }

  onUpdate() {
    this.uniforms.uTime.value = Framework.time
    this.uniforms.uColor.value = this.color
  }

  static async init() {
    return new Wave({
      geometry: await WaveGeometry(),
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