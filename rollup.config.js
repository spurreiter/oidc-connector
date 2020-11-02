import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'

const banner = `/*!
Copyright 2020 spurreiter

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0
*/
`

export default [{
  input: 'src/index.js',
  plugins: [],
  output: [
    {
      file: 'esm/index.js',
      format: 'es',
      banner
    },
    {
      file: 'esm/index.min.js',
      format: 'es',
      plugins: [terser()],
      banner
    }
  ]
}, {
  input: 'src/index.js',
  plugins: [babel({ babelHelpers: 'bundled' })],
  output: [
    {
      file: 'dist/index.cjs',
      format: 'umd',
      name: '_oicd',
      banner
    },
    {
      file: 'dist/index.min.cjs',
      format: 'umd',
      name: '_oicd',
      plugins: [terser()],
      banner
    }
  ]
}, {
  input: 'src/adapter/cordova.js',
  plugins: [],
  output: [
    {
      file: 'esm/adapter/cordova.js',
      format: 'es'
    }
  ]
}, {
  input: 'src/adapter/cordova.js',
  plugins: [babel({ babelHelpers: 'bundled' })],
  output: [
    {
      file: 'dist/adapter/cordova.cjs',
      format: 'cjs'
    }
  ]
}, {
  input: 'src/adapter/cordova-native.js',
  plugins: [],
  output: [
    {
      file: 'esm/adapter/cordova-native.js',
      format: 'es'
    }
  ]
}, {
  input: 'src/adapter/cordova-native.js',
  plugins: [babel({ babelHelpers: 'bundled' })],
  output: [
    {
      file: 'dist/adapter/cordova-native.cjs',
      format: 'cjs'
    }
  ]
}]
