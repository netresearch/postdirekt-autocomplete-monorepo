import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import camelCase from 'lodash.camelcase';
import typescript from 'rollup-plugin-typescript2';
import css from 'rollup-plugin-css-only';
import { terser}  from 'rollup-plugin-terser';

const libraryName = 'postdirekt-autocomplete-lib';
const sdkName = 'postdirekt-autocomplete';

export default [
    {
        input: `packages/autocomplete-library/src/${libraryName}.ts`,
        output: [
            { file: `packages/autocomplete-library/dist/browser/${libraryName}.umd.js`, name: camelCase(libraryName), format: 'umd', sourcemap: true },
            { file: `packages/autocomplete-library/dist/browser/${libraryName}.amd.js`, name: camelCase(libraryName), format: 'amd', sourcemap: true },
            { file: `packages/autocomplete-library/dist/browser/${libraryName}.es.js`, name: camelCase(libraryName), format: 'es', sourcemap: true },
            { file: `packages/autocomplete-library/dist/browser/${libraryName}.esm.js`, name: camelCase(libraryName), format: 'esm', sourcemap: true },
            { file: `packages/autocomplete-library/dist/browser/${libraryName}.cjs.js`, name: camelCase(libraryName), format: 'cjs', sourcemap: true },
            { file: `packages/autocomplete-library/dist/browser/${libraryName}.min.js`, name: camelCase(libraryName), format: 'iife', sourcemap: true },
            { file: `packages/autocomplete-library/dist/browser/${libraryName}.system.js`, name: camelCase(libraryName), format: 'system', sourcemap: true },
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
            typescript({ useTsconfigDeclarationDir: true, tsconfig: 'tsconfig.json' }),

            // Resolve source maps to the original source
            sourceMaps(),
            terser()
        ],
    },
    {
        input: `packages/autocomplete-sdk/src/${sdkName}.ts`,
        output: [
            { file: `packages/autocomplete-sdk/dist/browser/${sdkName}.umd.js`, name: camelCase(sdkName), format: 'umd', sourcemap: true },
            { file: `packages/autocomplete-sdk/dist/browser/${sdkName}.amd.js`, name: camelCase(sdkName), format: 'amd', sourcemap: true },
            { file: `packages/autocomplete-sdk/dist/browser/${sdkName}.es.js`, name: camelCase(sdkName), format: 'es', sourcemap: true },
            { file: `packages/autocomplete-sdk/dist/browser/${sdkName}.esm.js`, name: camelCase(sdkName), format: 'esm', sourcemap: true },
            { file: `packages/autocomplete-sdk/dist/browser/${sdkName}.cjs.js`, name: camelCase(sdkName), format: 'cjs', sourcemap: true },
            { file: `packages/autocomplete-sdk/dist/browser/${sdkName}.min.js`, name: camelCase(sdkName), format: 'iife', sourcemap: true },
            { file: `packages/autocomplete-sdk/dist/browser/${sdkName}.system.js`, name: camelCase(sdkName), format: 'system', sourcemap: true },
        ],
        // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
        watch: {
            include: 'src/**',
        },
        plugins: [
            // Allow node_modules resolution, so you can use 'external' to control
            // which external modules to include in the bundle
            // https://github.com/rollup/rollup-plugin-node-resolve#usage
            resolve(
                {
                   browser: true, 
                }
            ),

            // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
            commonjs({
                include: 'node_modules/**'
            }),
            // Compile TypeScript files
            typescript({ useTsconfigDeclarationDir: true, tsconfig: 'tsconfig.json' }),

            // Resolve source maps to the original source
            sourceMaps(),
            terser()
        ],
    },
    {
        input: 'packages/autocomplete-library/css/styles.css',
        plugins: [
            css({ output: 'packages/autocomplete-library/dist/browser/styles.css' })
        ]
    }
]
