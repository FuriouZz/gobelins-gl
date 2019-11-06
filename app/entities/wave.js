import { Mesh, RepeatWrapping, RGBAFormat, Color } from "three";
import { WaveGeometry } from "../assets/geometries";
import { WaveMaterial } from "../assets/materials";
import { Framework } from "../framework";
import { texture } from "../utils/loader";
import { bind } from "lol/dist/esm/function";

export class Wave {

  constructor({ geometry, material, textures }) {
    bind(this, 'onResize', 'onUpdate', 'onDebug')

    this.geometry = geometry
    this.material = material
    this.textures = textures
    this.uniforms = this.material.uniforms
    this.uniforms.uNoise.value = this.textures.uNoise
    this.uniforms.uColor.value = (new Color()).setHex(0x2d9d9d)
    this.mesh = new Mesh(this.geometry, this.material)

    this.controller = {
      color: 0x2d9d9d,
      noiseSize: 0.75,
      noiseStrength: 0.75,//0.301,
      noiseInfluence: 1.0,
    }

    Framework.configure(this)
  }

  /**
   *
   * @param {dat.GUI} GUI
   */
  onDebug(GUI) {
    const f = GUI.addFolder('wave')
    f.addColor(this.controller, 'color').onChange((v) => {
      this.uniforms.uColor.value.setHex(v)
    })
    f.add(this.controller, 'noiseSize', 0, 1)
    f.add(this.controller, 'noiseStrength', 0, 1)
    f.add(this.controller, 'noiseInfluence', 0, 1)
  }

  onResize() {
    this.uniforms.uResolutionRatio.value = Framework.width / Framework.height
  }

  onUpdate() {
    this.uniforms.uTime.value = Framework.time
    this.uniforms.uNoiseData.value.size = this.controller.noiseSize
    this.uniforms.uNoiseData.value.strength = this.controller.noiseStrength
    this.uniforms.uNoiseData.value.influence = this.controller.noiseInfluence
  }

  static async init() {
    const [geometry, material, uNoise] = await Promise.all([
      await WaveGeometry(),
      await WaveMaterial(),
      await (async function() {
        const t = await texture('images/perlin.jpg')
        t.wrapS = RepeatWrapping
        t.wrapT = RepeatWrapping
        t.format = RGBAFormat
        return t
      })()
    ])

    return new Wave({
      geometry,
      material,
      textures: {
        uNoise
      }
    })
  }

}