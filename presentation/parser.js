const { readFile, writeFile, fetch } = require('lol/dist/cjs/node/fs')
const TOML = require('toml')
const fm = require('front-matter')
const template = require('lodash.template')
const Path = require('path')
const { omit } = require('lol/dist/cjs/object')
const { sortByKey } = require('lol/dist/cjs/array')

async function parseConfig() {
  const content = await readFile('presentation/config.toml', 'utf-8')
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

  return { config: toml.config, revealConfig: config.join('\n') }
}

async function parseSlides(config) {
  const slidesByFile = {}

  const files = fetch("presentation/slides/**/*.md")

  for (let i = 0; i < files.length; i++) {
    const path = files[i]
    const pathObj = Path.parse(path)

    const content = await readFile(path, 'utf-8')
    let { attributes, body } = fm(content)

    const headers = body.match(/<\s*slide[^>]*>/g).map(s => s.replace(/slide/, 'section').trim())
    const footers = body.match(/<\s*\/slide[^>]*>/g).map(s => s.replace(/slide/, 'section').trim())
    const markdowns = body.split(/<\s*slide[^>]*>/g).map(s => s.replace(/<\s*\/slide[^>]*>/, '').trim())
    markdowns.shift()

    const slides = []

    for (let i = 0; i < markdowns.length; i++) {
      const markdown = markdowns[i]
      let header = `${headers[i]}<textarea data-template>`
      let footer = `</textarea>${footers[i]}`

      let slide = `${header}${markdown}${footer}`
      slides.push( slide )
    }

    const first = slides.shift()

    slidesByFile[pathObj.name] = {
      name: pathObj.name,
      attributes,
      body: first.replace(/<\s*\/section[^>]*>/, slides.join('\n') + '\n</section>')
    }
  }

  const slides = config.order.map(name => slidesByFile[name].body)
  sortByKey(Object.keys(omit(slidesByFile, ...config.order), 'name'))
  .forEach(name => slides.push(slidesByFile[name].body))

  return slides.join('\n')
}

async function main() {
  const { config, revealConfig } = await parseConfig()
  const slides = await parseSlides(config)

  let index = await readFile('presentation/index.html.ejs', 'utf-8')
  index = template(index)({
    slides,
    revealConfig
  })
  await writeFile(index, 'presentation/index.html')
}

main()