const { rollup } = require('rollup')
const resolve = require('rollup-plugin-node-resolve')

async function main() {

  const bundle = await rollup({
    input: "src/main.js",
    watch: true,
    plugins: [
      resolve()
    ]
  })

  bundle.write({
    dir: "public",
    format: "cjs"
  })

}

main()