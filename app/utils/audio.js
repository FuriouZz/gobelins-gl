import { merge } from 'lol/dist/esm/object'

/**
 *
 * @param {AudioContext} ctx
 * @param {HTMLAudioElement|MediaStream|AudioBuffer} item
 */
export function source(ctx, item) {
  // Create a source from a <audio> element
  if (item instanceof HTMLAudioElement) {
    return ctx.createMediaElementSource(item)
  }

  // Create a source from a stream
  else if (item instanceof MediaStream) {
    return ctx.createMediaStreamSource(item)
  }

  // Create a source from an audio buffer
  else if (item instanceof AudioBuffer) {
    const source = ctx.createBufferSource()
    source.buffer = item
    return source
  }
}

/**
 * @callback OnAudioProcessCallback
 * @param {AnalyzerNode} analyzer
 * @returns {boolean}
 */

/**
 *
 * @param {AudioContext} ctx
 * @param {MediaElementAudioSourceNode|MediaStreamAudioSourceNode|AudioBufferSourceNode} source
 * @param {Object} options
 *
 * @param {OnAudioProcessCallback} options.onaudioprocess
 * This callback is displayed as a global member.
 *
 * @param {Object} options.analyser
 * It is an AudioNode that passes the audio stream unchanged from the input to the output,
 * but allows you to take the generated data, process it, and create audio visualizations.
 * @param {number} options.analyser.smoothingTimeConstant
 * @param {number} options.analyser.fftSize
 *
 * @param {Object} options.scriptProcessor
 * A script processing is an interface used for direct audio processing.
 * @param {number} options.scriptProcessor.bufferSize
 * Must be a power of 2 value : 256, 512, 1024, 2048, 4096, 8192, 16384.
 * This value controls how frequently the audioprocess event is dispatched
 * and how many sample-frames need to be processed each call.
 * Lower is the value better is the latency.
 * @param {number} options.scriptProcessor.numberInputChannel
 * @param {number} options.scriptProcessor.numberOutputChannel
 */
export function analyze(ctx, source, options = {}) {
  options = merge({
    onaudioprocess(analyzer) { return true },
    analyser: {
      smoothingTimeConstant: 0.8,
      fftSize: 256
    },
    scriptProcessor: {
      bufferSize: 256,
      numberInputChannel: 1,
      numberOutputChannel: 1
    }
  }, options)

  const analyser = ctx.createAnalyser()
  analyser.smoothingTimeConstant = options.analyser.smoothingTimeConstant
  analyser.fftSize = options.analyser.fftSize

  const processor = ctx.createScriptProcessor(
    options.scriptProcessor.bufferSize,
    options.scriptProcessor.numberInputChannel,
    options.scriptProcessor.numberOutputChannel
  )

  function onAudioProcess() {
    if (!options.onaudioprocess(analyser)) {
      processor.removeEventListener('audioprocess', onAudioProcess)
      analyser.disconnect()
      processor.disconnect()
    }
  }

  processor.addEventListener('audioprocess', onAudioProcess)

  return source.connect(analyser).connect(processor)
}