import { Framework } from "./framework"
import { Scene, WebGLRenderer, PerspectiveCamera, Light, PointLight, WebGLRenderTarget, RGBAFormat, OrthographicCamera } from "three"
import { Wave } from "./entities/wave"
import { load_shader } from "./assets/shaders"
import { GUI } from "./gui"
import { Cube } from "./entities/cube"
import { Mirror } from "./entities/mirror"

class Main {

  constructor() {
    this.onResize = this.onResize.bind(this)
    this.onRender = this.onRender.bind(this)

    const canvas = document.querySelector('#webgl')
    this.renderer = new WebGLRenderer({ canvas, antialias: true })
    this.renderer.setClearColor(0xa111b)

    this.camera = new OrthographicCamera(-1, 1, 1, -1, 0.001, 1000)
    this.camera.translateZ(5)
    this.scene = new Scene()
    this.rttScene = new Scene()
    this.rttCamera = this.camera.clone()
    this.target = new WebGLRenderTarget(Framework.width, Framework.height)

    this.init()

    Framework.configure(this).play()

    GUI.addColor({ bgcolor: 0xa111b }, 'bgcolor').onChange((v) => {
      this.renderer.setClearColor(v)
    })
  }

  async init() {
    const cube = await Cube.init()
    this.rttScene.add(cube.mesh)

    let l = new PointLight()
    l.position.set(5, 5, 5)
    this.rttScene.add(l)

    l = new PointLight()
    l.position.set(-5, 5, 5)
    this.rttScene.add(l)

    const mirror = await Mirror.init(this.target)
    this.scene.add(mirror.mesh)

    const wave = await Wave.init()
    this.rttScene.add(wave.mesh)
  }

  onResize() {
    this.renderer.setSize(Framework.width, Framework.height, true)
    this.target.setSize(Framework.width, Framework.height)
    this.camera.aspect = Framework.aspectRatio
    this.camera.updateProjectionMatrix()
    this.rttCamera.aspect = Framework.aspectRatio
    this.rttCamera.updateProjectionMatrix()
  }

  onRender() {
    this.renderer.setRenderTarget(this.target)
    this.renderer.render(this.rttScene, this.rttCamera)
    this.renderer.setRenderTarget(null)
    this.renderer.render(this.scene, this.camera)
  }

  static main() {
    new Main()
  }

}

window.addEventListener('DOMContentLoaded', Main.main)