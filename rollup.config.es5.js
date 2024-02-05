import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import camelCase from 'lodash.camelcase';
import typescript from 'rollup-plugin-typescript2';
import css from 'rollup-plugin-css-only';
import uglify from '@lopatnov/rollup-plugin-uglify';

const libraryName = 'postdirekt-autocomplete-lib';

export default [
    {
        input: `packages/autocomplete-library/src/${libraryName}.ts`,
        output: [
            { file: `dist/browser/${libraryName}.umd.js`, name: camelCase(libraryName), format: 'umd', sourcemap: true },
            { file: `dist/browser/${libraryName}.amd.js`, name: camelCase(libraryName), format: 'amd', sourcemap: true },
            { file: `dist/browser/${libraryName}.cjs.js`, name: camelCase(libraryName), format: 'cjs', sourcemap: true },
            { file: `dist/browser/${libraryName}.min.js`, name: camelCase(libraryName), format: 'iife', sourcemap: true },
            { file: `dist/browser/${libraryName}.system.js`, name: camelCase(libraryName), format: 'system', sourcemap: true },
        ],
        // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
        watch: {
            include: 'src/**',
        },
        plugins: [
            // Allow node_modules resolution, so you can use 'external' to control
            // which external modules to include in the bundle
            // https://github.com/rollup/rollup-plugin-node-resolve#usage
            resolve(),

            // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
            commonjs({
                include: 'node_modules/**'
            }),
            // Compile TypeScript files
            typescript({ useTsconfigDeclarationDir: true, tsconfig: 'tsconfig.es5.json' }),

            // Resolve source maps to the original source
            sourceMaps(),
            uglify(),
        ],
    },
    {
        input: 'packages/autocomplete-library/css/styles.css',
        plugins: [
            css({ output: 'dist/browser/styles.css' })
        ]
    }
]
