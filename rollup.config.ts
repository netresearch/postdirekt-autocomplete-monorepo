import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import camelCase from 'lodash.camelcase';
import typescript from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';

const pkg = require('./package.json');

const libraryName = 'postdirekt-autocomplete-lib';

export default {
  input: `src/${libraryName}.js`,
  output: [
    { file: `dist/browser/${libraryName}.umd.js`, name: camelCase(libraryName), format: 'umd', sourcemap: true },
    { file: `dist/browser/${libraryName}.amd.js`, name: camelCase(libraryName), format: 'amd', sourcemap: true },
    { file: `dist/browser/${libraryName}.es.js`, name: camelCase(libraryName), format: 'es', sourcemap: true },
    { file: `dist/browser/${libraryName}.cjs.js`, name: camelCase(libraryName), format: 'cjs', sourcemap: true },
    { file: `dist/browser/${libraryName}.min.js`, name: camelCase(libraryName), format: 'iife', sourcemap: true },
    { file: `dist/browser/${libraryName}.system.js`, name: camelCase(libraryName), format: 'system', sourcemap: true },
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: ['fetch', 'core-js'],
  watch: {
    include: 'src/**',
  },
  plugins: [
    // Allow json resolution
    json(),

    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs({
      include: 'node_modules/**'
    }),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true, objectHashIgnoreUnknownHack: true }),

    // Resolve source maps to the original source
    sourceMaps(),
  ],
}
