import { Cache } from "../utils/cache";
import { shader } from "../utils/loader";

const C = new Cache()

export function load_shader(url) {
  return C.fetch(url, async () => {
    const s = await shader(url)

    // Preload includes
    const includes = s.content.match(/include\(.+\)/g) || []
    for (let i = 0; i < includes.length; i++) {
      const path = includes[i]
      .replace(/include\(|\)|\s/g, '')
      .split(/,/)[0]
      .replace(/'|"/g, '')
      await load_shader(path)
    }

    return {
      get(section = 'name', params = {}) {
        return s.get(section, Object.assign(params, {
          include: get_shader
        }))
      }
    }
  })
}

export function get_shader(url, section = 'default', params = {}) {
  try {
    const shader = C._cache.get(url)
    return shader.get(section, params)
  } catch(e) {
    console.log(e)
    throw new Error(`An error occured on shader from ${url}`)
  }
}