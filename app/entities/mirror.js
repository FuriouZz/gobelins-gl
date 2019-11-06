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

    this.offsetX = 0.5
    this.offsetY = 0.5
    this.repeatX = 2.0
    this.repeatY = 2.0

    Framework.configure(this)
  }

  /**
   *
   * @param {dat.GUI} GUI
   * @memberof Mirror
   */
  onDebug(GUI) {
    const f = GUI.addFolder('mirror')
    f.add(this, 'repeatX', 1.0, 10.0)
    f.add(this, 'repeatY', 1.0, 10.0)
    f.add(this, 'offsetX', 0.0, 1.0)
    f.add(this, 'offsetY', 0.0, 1.0)
  }

  onResize() {
    this.uniforms.uResolutionRatio.value = Framework.width / Framework.height
  }

  onUpdate() {
    this.uniforms.uTime.value = Framework.time
    this.uniforms.uTex0.value = this.textures.uTex0.texture
    this.uniforms.uMirror.value.offsetX = this.offsetX
    this.uniforms.uMirror.value.offsetY = this.offsetY
    this.uniforms.uMirror.value.repeatX = this.repeatX
    this.uniforms.uMirror.value.repeatY = this.repeatY
  }

  static async init(target) {
    return new Mirror({
      geometry: await WaveGeometry(),
      material: await MirrorMaterial(),
      textures: {
        uTex0: target
      }
    })
  }

}