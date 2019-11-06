import { CubeGeometry } from "../assets/geometries";
import { CubeMaterial } from "../assets/materials";
import { Mesh, Color } from "three";
import { Framework } from "../framework";
import { GUI } from "../gui";

export class Cube {

  constructor({ geometry, material }) {
    this.onUpdate = this.onUpdate.bind(this)
    this.onResize = this.onResize.bind(this)

    this.geometry = geometry
    this.material = material
    this.uniforms = this.material.uniforms
    this.color = new Color()
    this.color.setHex(0xb644a2)

    this.mesh = new Mesh(this.geometry, this.material)
    this.mesh.scale.set(0.25, 0.25, 0.25)

    Framework.configure(this)

    GUI.addColor({ cubecolor: 0xb644a2 }, 'cubecolor').onChange((v) => {
      this.color.setHex(v)
    })
  }

  onResize() {}

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