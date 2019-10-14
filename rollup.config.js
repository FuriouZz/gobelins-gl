import resolve from 'rollup-plugin-node-resolve'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

export default {
  input: "app/main.js",
  output: {
    file: 'public/main.js',
    format: 'iife', // immediately-invoked function expression — suitable for <script> tags
    sourcemap: true
  },
  plugins: [
    resolve(),
    serve({
      contentBase: [ 'public' ]
    }),
    livereload({
      watch: "public/**/*",
      verbose: true
    })
  ]
}