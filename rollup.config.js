import { terser } from 'rollup-plugin-terser'

export default [{
  input: 'src/index.js',
  output: [
    {
      file: 'esm/index.js',
      format: 'es'
    },
    {
      file: 'esm/index.min.js',
      format: 'es',
      name: 'version',
      plugins: [terser()]
    }
  ],
  plugins: []
}]
