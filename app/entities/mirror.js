import { Mesh } from "three";
import { WaveGeometry } from "../assets/geometries";
import { MirrorMaterial } from "../assets/materials";
import { Framework } from "../framework";

export class Mirror {

  constructor({ geometry, material, textures }) {
    this.onUpdate = this.onUpdate.bind(this)
    this.onResize = this.onResize.bind(this)

    this.geometry = geometry
    this.material = material
    this.textures = textures
    this.uniforms = this.material.uniforms

    this.mesh = new Mesh(this.geometry, this.material)

    Framework.configure(this)
  }

  onResize() {
    this.uniforms.uResolutionRatio.value = Framework.width / Framework.height
  }

  onUpdate() {
    this.uniforms.uTime.value = Framework.time
    this.uniforms.uTex0.value = this.textures.uTex0.texture
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