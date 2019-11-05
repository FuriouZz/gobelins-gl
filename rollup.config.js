import resolve from 'rollup-plugin-node-resolve'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import ARGV from 'lol/dist/cjs/object/argv'

const argv = ARGV.parse(process.argv)
const plugins = []

if (argv.w || argv.watch) {
  plugins.push(
    serve({
      contentBase: [ 'public', 'app/assets' ],
      port: 3000
    }),

    // livereload({
    //   watch: "app/**/*",
    //   verbose: true,
    //   port: 35730
    // })
  )
}

export default {
  input: "app/main.js",
  output: {
    file: 'public/main.js',
    format: 'iife', // immediately-invoked function expression — suitable for <script> tags
    sourcemap: true
  },
  plugins: [
    resolve(),
    ...plugins
  ]
}