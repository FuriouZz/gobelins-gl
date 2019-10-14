import { Framework } from './framework';
import { PerspectiveCamera, Scene, SphereBufferGeometry, MeshBasicMaterial, Mesh, WebGLRenderer } from 'three';

class Main {

  constructor() {
    this.onResize = this.onResize.bind(this)
    this.onUpdate = this.onUpdate.bind(this)
    this.onRender = this.onRender.bind(this)
    this.onStart  = this.onStart.bind(this)

    const canvas = document.querySelector('#webgl')
    this.renderer = new WebGLRenderer({ canvas })
    this.renderer.setClearColor(0x0088ff)

    this.camera = new PerspectiveCamera(30, this.aspectRatio, 0.001, 1000)
    this.camera.translateZ(5)

    this.scene = new Scene()
    this.createSphere()

    Framework.configure(this).play()
  }

  createSphere() {
    const g = new SphereBufferGeometry(1, 20, 20)
    const m = new MeshBasicMaterial({
      color: 0xffaa22
    })
    this.sphere = new Mesh(g, m)
    this.scene.add(this.sphere)
  }

  onResize() {
    this.renderer.setSize(Framework.width, Framework.height)
    this.camera.aspect = Framework.aspectRatio
    this.camera.updateProjectionMatrix()
  }

  onStart() {}

  onUpdate() {}

  onRender() {
    this.renderer.render(this.scene, this.camera)
  }

  static async main() {
    new Main()
  }

}

window.addEventListener('DOMContentLoaded', Main.main)