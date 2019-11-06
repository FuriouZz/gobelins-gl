import { Dispatcher } from 'lol/dist/esm/dispatcher'
import * as LoaderUtils from './utils/loader'
import { GUI as G } from 'dat.gui';

class $Framework {

  constructor() {
    this.start  = new Dispatcher()
    this.update = new Dispatcher()
    this.render = new Dispatcher()
    this.resize = new Dispatcher()
    this.debug  = new Dispatcher()
    this.load = LoaderUtils
    this.debugEnabled = false

    this._onStart  = this._onStart.bind(this)
    this._onResize = this._onResize.bind(this)
    this._onRAF    = this._onRAF.bind(this)

    this.time = performance.now() / 1000

    this.width = window.innerWidth
    this.height = window.innerHeight

    this.paused = true

    this.activate()
  }

  get aspectRatio() {
    return this.width / this.height
  }

  configure(options = {}) {
    if (typeof options.onStart  == 'function') this.start .on(options.onStart)
    if (typeof options.onUpdate == 'function') this.update.on(options.onUpdate)
    if (typeof options.onRender == 'function') this.render.on(options.onRender)
    if (typeof options.onResize == 'function') this.resize.on(options.onResize)
    if (typeof options.onDebug  == 'function') this.debug.on(options.onDebug)
    return this
  }

  activate() {
    window.addEventListener('resize', this._onResize)
    return this
  }

  desactivate() {
    window.removeEventListener('resize', this._onResize)
    return this
  }

  play() {
    this.paused = false
    window.requestAnimationFrame(this._onStart)
    return this
  }

  pause() {
    this.paused = true
    return this
  }

  _onResize() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.resize.dispatch()
  }

  _onStart() {
    this._onResize()
    if (this.debugEnabled) this._onDebug()
    this._onRAF()
    this.start.dispatch()
  }

  _onDebug() {
    this.GUI = new G()
    this.debug.dispatch(this.GUI)
  }

  _onRAF(time) {
    if (this.paused) return
    window.requestAnimationFrame(this._onRAF)

    time = time / 1000
    this.deltaTime = time - this.time
    this.time = time

    this.update.dispatch([this.deltaTime, this.time])
    this.render.dispatch()
  }

}

export const Framework = new $Framework()