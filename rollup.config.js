import resolve from 'rollup-plugin-node-resolve'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import { template2 } from 'lol/dist/cjs/string/template'
import * as Fs from 'lol/dist/cjs/node/fs'
import * as Path from 'path'

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
      contentBase: [ 'public' ],
      port: 3000
    }),
    livereload({
      watch: "public/**/*",
      verbose: true,
      port: 35730
    }),
    {
      resolveId(id, parent) {
        return Path.join(Path.dirname(parent), id)
      },

      async transform(code, id) {
        if (id.match(/\.html/)) {          
          const layout  = await Fs.readFile('./slides/index.html.ejs', 'utf-8')
          Fs.writeFile(template2(layout, { content: code }), './slides/index.html')
          return ''
        }    
      }
    }
  ]
}