import { Cache } from "../utils/cache"
import { RawShaderMaterial } from "three"
import { Framework } from "../framework"
import { load_shader } from "./shaders"

const C = new Cache

export function WaveMaterial() {
  return C.fetch('wave', async () => {
    const shader = await load_shader('shaders/wave.glsl')//Framework.load.shader('shaders/wave.glsl')

    return new RawShaderMaterial({
      vertexShader: shader.get('vertex'),
      fragmentShader: shader.get('fragment'),
      uniforms: {
        uResolutionRatio: { value: 1.0 },
        uTime: { value: 1.0 },
        uNoise: { value: null },
      }
    })
  })
}