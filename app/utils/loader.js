import * as NetImage from 'lol/dist/esm/dom/image'
import * as NetAudio from 'lol/dist/esm/dom/audio'
import * as NetVideo from 'lol/dist/esm/dom/video'
import { Net } from 'lol/dist/esm/dom/net'
import { Texture } from 'three'
import template from 'lodash-es/template'

/**
 * Load image
 * @param {string} url
 */
export function image(url) {
  return NetImage.load(url)
}

/**
 * Load image and create texture
 * @param {string} url
 */
export async function texture(url) {
  const img = await image(url)
  const texture = new Texture(img.element)
  texture.needsUpdate = true
  return texture
}

/**
 * Load audio metadata
 * @param {string} url
 */
export function audio(url) {
  return NetAudio.load(url)
}

/**
 * Load video metadata
 * @param {string} url
 */
export function video(url) {
  return NetVideo.load(url)
}

/**
 * Load shader
 * @param {string} url
 */
export async function shader(url) {
  const { response } = await Net.text(url)
  return parseShader(response)
}

/**
 * Parse shader string
 * @param {string} content
 */
export function parseShader(content) {
  const sections = {}
  sections['default'] = [content]

  const lines = content.replace(/\r\n/g, '\n').split(/\n/g)

  let currentPass = null

  for (const index in lines) {
    const line = lines[index]

    if (line.match(/^-{2}\s.+$/)) {
      const match = line.match(/(\w|\.)+/)
      if (match !== null) {
        currentPass = match[0]
        continue;
      }
    }

    if (currentPass) {
      sections[currentPass] = sections[currentPass] || []
      sections[currentPass].push(line)
    }
  }

  return {
    content,
    get(name = "default", params) {
      if (!sections[name]) {
        console.log(`[fine] Shader section with name "${name}" does not exist.`)
        return ''
      }

      const shader = sections[name].join('\n')

      const t = template(shader, {
        interpolate: /{{([\s\S]+?)}}/g,
        evaluate: /{%([\s\S]+?)%}/g,
        escape: /{#([\s\S]+?)#}/g,
      })(params).trim()
      return t
    }
  }
}

/**
 *
 * @param {AudioContext} context
 * @param {string} url
 */
export async function audioBuffer(context, url) {
  const { response } = await Net.bytes(url)
  return context.decodeAudioData(response)
}

/**
 * Open an audio stream
 * @param {string} url
 */
export async function audioStream() {
  const stream = await navigator.getUserMedia({
    audio: true,
    video: false
  })

  const url = URL.createObjectURL(stream)

  return { stream, url }
}