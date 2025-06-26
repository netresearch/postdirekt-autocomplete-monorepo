import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import camelCase from 'lodash.camelcase';
// TypeScript compilation now handled by tsc --build
import css from 'rollup-plugin-css-only';
import terser from '@rollup/plugin-terser';
import del from 'rollup-plugin-delete';

const libraryName = 'postdirekt-autocomplete-lib';

export default {
    input: `packages/autocomplete-library/dist/${libraryName}.js`,
    output: [
        { file: `dist/browser/${libraryName}.umd.js`, name: camelCase(libraryName), format: 'umd', sourcemap: true },
        { file: `dist/browser/${libraryName}.amd.js`, name: camelCase(libraryName), format: 'amd', sourcemap: true },
        { file: `dist/browser/${libraryName}.cjs.js`, name: camelCase(libraryName), format: 'cjs', sourcemap: true },
        { file: `dist/browser/${libraryName}.min.js`, name: camelCase(libraryName), format: 'iife', sourcemap: true },
        { file: `dist/browser/${libraryName}.system.js`, name: camelCase(libraryName), format: 'system', sourcemap: true },
    ],
    plugins: [
        del({ targets: 'dist/*' }),
        resolve(),
        commonjs({ include: 'node_modules/**' }),
        css({ output: `dist/browser/styles.css` }),
        sourceMaps(),
        terser({
            ecma: 5,
            output: { comments: false },
            compress: { drop_console: true }
        })
    ],
    watch: {
        include: 'src/**',
    },
};