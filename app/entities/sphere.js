import { SphereGeometry } from "../assets/geometries";
import { SphereMaterial } from "../assets/materials";
import { bind } from "lol/dist/esm/function";
import { Mesh, RepeatWrapping, RGBAFormat, Color } from "three";
import { Framework } from "../framework";
import { texture } from "../utils/loader";

export class Sphere {

  constructor({ geometry, material, textures }) {
    bind(this, 'onDebug', 'onUpdate')

    this.geometry = geometry
    this.material = material
    this.textures = textures
    this.uniforms = this.material.uniforms
    this.uniforms.uNoise.value = this.textures.uNoise
    this.uniforms.uColor.value = (new Color()).setHex(0xffffff)
    this.mesh = new Mesh(this.geometry, this.material)
    this.mesh.scale.set(0.25, 0.25, 0.25)

    this.controller = {
      progress: 0.5,
      color: 0xffffff
    }

    Framework.configure(this)
  }

  /**
   * @param {dat.GUI} GUI
   * @memberof Cube
   */
  onDebug(GUI) {
    const f = GUI.addFolder('sphere')
    f.addColor(this.controller, 'color').onChange((v) => {
      this.uniforms.uColor.value.setHex(v)
    })
    f.add(this.controller, 'progress', 0, 1)
  }

  onUpdate() {
    this.uniforms.uProgress.value = this.controller.progress
    this.uniforms.uTime.value = Framework.time
  }

  static async init() {
    const [geometry, material, uNoise] = await Promise.all([
      await SphereGeometry(),
      await SphereMaterial(),
      await (async function() {
        const t = await texture('images/perlin.jpg')
        t.wrapS = RepeatWrapping
        t.wrapT = RepeatWrapping
        t.format = RGBAFormat
        return t
      })()
    ])

    return new Sphere({
      geometry,
      material,
      textures: {
        uNoise
      }
    })
  }

}