import { Framework } from "./framework"
import { Scene, WebGLRenderer, PerspectiveCamera } from "three"
import { Wave } from "./entities/wave"
import { load_shader } from "./assets/shaders"

class Main {

  constructor() {
    this.onResize = this.onResize.bind(this)
    // this.onUpdate = this.onUpdate.bind(this)
    this.onRender = this.onRender.bind(this)
    this.onStart  = this.onStart.bind(this)

    const canvas = document.querySelector('#webgl')
    this.renderer = new WebGLRenderer({ canvas })
    this.renderer.setClearColor(0x000000)

    this.camera = new PerspectiveCamera(30, this.aspectRatio, 0.001, 1000)
    this.camera.translateZ(5)
    this.scene = new Scene()

    this.init()

    Framework.configure(this).play()
  }

  async init() {
    const wave = await Wave.init()
    this.scene.add(wave.mesh)
  }

  onResize() {
    this.renderer.setSize(Framework.width, Framework.height)
    this.camera.aspect = Framework.aspectRatio
    this.camera.updateProjectionMatrix()
  }

  onStart() {

  }

  onRender() {
    this.renderer.render(this.scene, this.camera)
  }

  static main() {
    new Main()
  }

}

window.addEventListener('DOMContentLoaded', Main.main)