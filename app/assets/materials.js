import { Cache } from "../utils/cache"
import { RawShaderMaterial, MeshPhongMaterial, ShaderMaterial } from "three"
import { load_shader } from "./shaders"
import { Color } from "../utils/color"
import { texture } from "../utils/loader"

const C = new Cache

export function WaveMaterial() {
  return C.fetch('wave', async () => {
    const shader = await load_shader('shaders/wave.glsl')

    return new RawShaderMaterial({
      vertexShader: shader.get('vertex'),
      fragmentShader: shader.get('fragment'),
      transparent: true,
      uniforms: {
        uResolutionRatio: { value: 1.0 },
        uTime: { value: 1.0 },
        uNoise: { value: null },
        uColor: { value: new Color(0x2d9d9d) },
        uNoiseData: {
          value: {
            size: 0.75,
            strength: 0.3,
            influence: 0.0125,
          }
        }
      }
    })
  })
}

export function CubeMaterial() {
  return C.fetch('cube', async () => {
    return new MeshPhongMaterial({
      map: await texture('images/square.jpg')
    })
  })
}

export function MirrorMaterial() {
  return C.fetch('mirror', async () => {
    const shader = await load_shader('shaders/mirror.glsl')

    return new RawShaderMaterial({
      vertexShader: shader.get('vertex'),
      fragmentShader: shader.get('fragment'),
      uniforms: {
        uMirror: {
          value: {
            repeatX: 2.0,
            offsetX: 0.5,
            repeatY: 2.0,
            offsetY: 0.5,
          }
        },
        uResolutionRatio: { value: 1.0 },
        uTime: { value: 1.0 },
        uTex0: { value: null },
      }
    })
  })
}

export function SphereMaterial() {
  return C.fetch('sphere', async () => {
    const shader = await load_shader('shaders/sphere.glsl')

    return new ShaderMaterial({
      vertexShader: shader.get('vertex'),
      fragmentShader: shader.get('fragment'),
      transparent: true,
      uniforms: {
        uProgress: { value: 0.0 },
        uNoise: { value: null },
        uTime: { value: 1.0 },
        uColor: { value: new Color(0xffffff) },
      }
    })
  })
}