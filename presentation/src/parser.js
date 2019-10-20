const { readFile, writeFile } = require('lol/dist/cjs/node/fs')
const TOML = require('toml')
const fm = require('front-matter')
const template = require('lodash.template')
const Path = require('path')
const chokidar = require('chokidar')
const { JSDOM } = require("jsdom")
const ARGV = require('lol/dist/cjs/object/argv')

async function parseConfig(argv) {
  const content = await readFile(Path.join(argv.dir, 'config.toml'), 'utf-8')
  const toml = TOML.parse(content)
  const reveal = JSON.stringify(toml.reveal || {}, null, 2)
  const lines = reveal.split(/\r?\n/)
  let config = []

  for (let line of lines) {
    let value = line.match(/\"@.+\"/)
    if (value) {
      line = line.replace(/\"@.+\"/, value[0].replace(/^\"@|"$/g, ''))
    }
    config.push( line )
  }

  return {
    config: {
      main: Path.join(argv.dir, toml.config.slides || 'main.md'),
      input: Path.join(argv.dir, toml.config.input || 'src/index.html.ejs'),
      output: Path.join(argv.dir, toml.config.output || 'out/index.html')
    },
    revealConfig: config.join('\n')
  }
}

async function parseMain(config) {
  const main = await readFile(config.main, 'utf-8')
  const dom = new JSDOM(main)
  const $imports = dom.window.document.querySelectorAll('import')

  const slides = []

  for (let i = 0; i < $imports.length; i++) {
    const $import = $imports[i]
    try {
      const path = Path.join(Path.dirname(config.main), $import.getAttribute('name'))
      slides.push( await parseSlides(path) )
    } catch(e) {
      console.log('Invalid import')
    }
  }

  return slides.join('\n\n---\n\n')
}

async function parseSlides(path) {
  const content = await readFile(path, 'utf-8')
  let { body } = fm(content)

  const dom = new JSDOM(body)
  const slides = []

  const $slides = dom.window.document.querySelectorAll('slide')

  for (let j = 0; j < $slides.length; j++) {
    const $slide = $slides[j];
    let header = '\n--\n'

    if ($slide.attributes.length > 0) {
      const headers = []
      for (const attribute of $slide.attributes) {
        headers.push(`${attribute.name}="${attribute.value}"`)
        if (attribute.name == 'main') {
          header = '\n---\n\n'
        }
      }
      header += `<!-- .slide: ${headers.join(' ')} -->\n`
    }

    slides.push(`${header}${$slide.textContent}`)
  }

  return `<section data-markdown data-separator="^\\n---\\n$" data-separator-vertical="^\\n--\\n$">
  <script type="text/template">\n${slides.join('').trim().replace(/^-*/, '').trim()}\n\n</script>
</section>`
}

async function compile(argv) {
  const { config, revealConfig } = await parseConfig(argv)
  const slides = await parseMain(config)
  let index = await readFile(config.input, 'utf-8')
  index = template(index)({
    slides,
    revealConfig
  })
  await writeFile(index, config.output)
  console.log(`[Slides] Compiled into ${config.output}`)
}

async function main(argv) {
  await compile(argv)

  if (argv.watch || argv.w) {
    console.log(`[Slides] Start watching ${Path.join(argv.dir, '**/*.md')}`);
    chokidar.watch(Path.join(argv.dir, '**/*.md')).on('change', () => {
      compile(argv)
    })
  }
}

main(ARGV.parse(process.argv))