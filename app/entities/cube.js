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
    this.material.color = (new Color()).setHex(0xb644a2)
    this.uniforms = this.material.uniforms
    this.mesh = new Mesh(this.geometry, this.material)
    this.mesh.scale.set(0.25, 0.25, 0.25)

    this.controller = {
      color: 0xb644a2
    }

    Framework.configure(this)
  }

  /**
   * @param {dat.GUI} GUI
   * @memberof Cube
   */
  onDebug(GUI) {
    const f = GUI.addFolder('cube')
    f.addColor(this.controller, 'color').onChange((v) => {
      this.material.color.setHex(v)
    })
  }

  onUpdate() {
    this.mesh.rotateX(0.025)
    this.mesh.rotateY(0.025)
  }

  static async init() {
    const [geometry, material] = await Promise.all([
      await CubeGeometry(),
      await CubeMaterial(),
    ])

    return new Cube({ geometry, material })
  }

}