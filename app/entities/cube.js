import { CubeGeometry } from "../assets/geometries";
import { CubeMaterial } from "../assets/materials";
import { Mesh, Color } from "three";
import { Framework } from "../framework";
import { bind } from "lol/dist/esm/function";

export class Cube {

  constructor({ geometry, material }) {
    bind(this, 'onDebug', 'onUpdate')

    this.geometry = geometry
    this.material = material
    this.uniforms = this.material.uniforms
    this.color = new Color()
    this.color.setHex(0xb644a2)

    this.mesh = new Mesh(this.geometry, this.material)
    this.mesh.scale.set(0.25, 0.25, 0.25)

    Framework.configure(this)
  }

  /**
   * @param {dat.GUI} GUI
   * @memberof Cube
   */
  onDebug(GUI) {
    GUI.addColor({ cubecolor: 0xb644a2 }, 'cubecolor').onChange((v) => {
      this.color.setHex(v)
    })
  }

  onUpdate() {
    this.material.color = this.color
    this.mesh.rotateX(0.025)
    this.mesh.rotateY(0.025)
  }

  static async init() {
    return new Cube({
      geometry: await CubeGeometry(),
      material: await CubeMaterial()
    })
  }

}