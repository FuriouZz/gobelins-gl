import { Framework } from '../framework';
import { PerspectiveCamera, Scene, SphereBufferGeometry, Mesh, WebGLRenderer, WebGLRenderTarget, ShaderMaterial } from 'three';
import * as AudioUtils from '../utils/audio'

class Main {

  constructor() {
    this.onResize = this.onResize.bind(this)
    this.onUpdate = this.onUpdate.bind(this)
    this.onRender = this.onRender.bind(this)
    this.onStart  = this.onStart.bind(this)
    this.init()
  }

  async init() {
    const canvas = document.querySelector('#webgl')
    this.renderer = new WebGLRenderer({ canvas })
    this.renderer.setClearColor(0x0088ff)

    this.camera = new PerspectiveCamera(30, this.aspectRatio, 0.001, 1000)
    this.camera.translateZ(5)

    this.data = new Float32Array(256)
    this.scale0 = 0
    this.scale1 = 0

    this.scene = new Scene()
    await this.createSphere()
    await this.audioContext()

    Framework.configure(this).play()
  }

  async createSphere() {
    const shader = await Framework.load.shader('assets/shaders/texture.glsl')
    const texture = await Framework.load.texture('assets/images/mmp.jpg')

    const g = new SphereBufferGeometry(1, 20, 20)
    const m = new ShaderMaterial({
      uniforms: {
        "uTexture": { value: texture }
      },
      vertexShader: shader.get('vertex'),
      fragmentShader: shader.get('fragment')
    })
    this.sphere = new Mesh(g, m)
    this.scene.add(this.sphere)
  }

  async audioContext() {
    const { element } = await Framework.load.audio('assets/audios/looking-glass.wav')
    element.play()

    const ctx = new AudioContext
    const source = AudioUtils.source(ctx, element)
    AudioUtils.analyze(ctx, source, {
      /**
       *
       * @param {AnalyserNode} analyzer
       */
      onaudioprocess: (analyzer) => {
        analyzer.getFloatTimeDomainData(this.data)

        let v = 0
        for (let i = 0; i < this.data.length; i++) {
          const element = this.data[i]
          if (element > v) v = element
        }

        this.scale0 = v

        return true
      }
    })

    source.connect(ctx.destination)
  }

  onResize() {
    this.camera.aspect = Framework.aspectRatio
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(Framework.width, Framework.height)
  }

  onStart() {}

  onUpdate() {
    this.scale1 += (this.scale0 - this.scale1) * 0.125
    const scale = 0.5 + this.scale1 * 0.5

    this.sphere.scale.set(scale, scale, scale)
  }

  onRender() {
    this.renderer.render(this.scene, this.camera)
  }

  static async main() {
    new Main()
  }

}

window.addEventListener('DOMContentLoaded', Main.main)