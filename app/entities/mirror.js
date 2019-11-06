import { Mesh } from "three";
import { WaveGeometry } from "../assets/geometries";
import { MirrorMaterial } from "../assets/materials";
import { Framework } from "../framework";
import { bind } from "lol/dist/esm/function";

export class Mirror {

  constructor({ geometry, material, textures }) {
    bind(this, 'onUpdate', 'onResize', 'onDebug')

    this.geometry = geometry
    this.material = material
    this.textures = textures
    this.uniforms = this.material.uniforms
    this.mesh = new Mesh(this.geometry, this.material)

    this.controller = {
      offsetX: 0.5,
      offsetY: 0.5,
      repeatX: 2.0,
      repeatY: 2.0,
    }

    Framework.configure(this)
  }

  /**
   *
   * @param {dat.GUI} GUI
   * @memberof Mirror
   */
  onDebug(GUI) {
    const f = GUI.addFolder('mirror')
    f.add(this.controller, 'repeatX', 1.0, 10.0)
    f.add(this.controller, 'repeatY', 1.0, 10.0)
    f.add(this.controller, 'offsetX', 0.0, 1.0)
    f.add(this.controller, 'offsetY', 0.0, 1.0)
  }

  onResize() {
    this.uniforms.uResolutionRatio.value = Framework.width / Framework.height
  }

  onUpdate() {
    this.uniforms.uTime.value = Framework.time
    this.uniforms.uTex0.value = this.textures.uTex0.texture
    this.uniforms.uMirror.value.offsetX = this.controller.offsetX
    this.uniforms.uMirror.value.offsetY = this.controller.offsetY
    this.uniforms.uMirror.value.repeatX = this.controller.repeatX
    this.uniforms.uMirror.value.repeatY = this.controller.repeatY
  }

  static async init(target) {
    const [geometry, material] = await Promise.all([
      await WaveGeometry(),
      await MirrorMaterial()
    ])

    return new Mirror({
      geometry,
      material,
      textures: {
        uTex0: target
      }
    })
  }

}