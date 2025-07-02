import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import camelCase from 'lodash.camelcase';
// TypeScript compilation now handled by tsc --build
import css from 'rollup-plugin-css-only';
import terser from '@rollup/plugin-terser';
import del from 'rollup-plugin-delete';

const libraryName = 'postdirekt-autocomplete-lib';
const sdkName = 'postdirekt-autocomplete';

const createPlugins = (outputDir, { hasCss = false } = {}) => {
    const plugins = [
        del({ targets: `${outputDir}/*`, runOnce: true }),
        resolve({ browser: true }),
        commonjs({ include: 'node_modules/**' }),
    ];

    if (hasCss) {
        plugins.push(css({ output: `${outputDir}/styles.css` }));
    }

    plugins.push(sourceMaps(), terser());
    return plugins;
};

export default [
    {
        input: `packages/autocomplete-library/dist/${libraryName}.js`,
        output: [
            { file: `packages/autocomplete-library/dist/browser/${libraryName}.umd.js`, name: camelCase(libraryName), format: 'umd', sourcemap: true },
            { file: `packages/autocomplete-library/dist/browser/${libraryName}.amd.js`, name: camelCase(libraryName), format: 'amd', sourcemap: true },
            { file: `packages/autocomplete-library/dist/browser/${libraryName}.es.js`, name: camelCase(libraryName), format: 'es', sourcemap: true },
            { file: `packages/autocomplete-library/dist/browser/${libraryName}.cjs.js`, name: camelCase(libraryName), format: 'cjs', sourcemap: true },
            { file: `packages/autocomplete-library/dist/browser/${libraryName}.min.js`, name: camelCase(libraryName), format: 'iife', sourcemap: true },
            { file: `packages/autocomplete-library/dist/browser/${libraryName}.system.js`, name: camelCase(libraryName), format: 'system', sourcemap: true },
        ],
        plugins: createPlugins('packages/autocomplete-library/dist/browser', { hasCss: true }),
        watch: { include: 'packages/autocomplete-library/dist/**' },
    },
    {
        input: `packages/autocomplete-sdk/dist/${sdkName}.js`,
        output: [
            { file: `packages/autocomplete-sdk/dist/browser/${sdkName}.umd.js`, name: camelCase(sdkName), format: 'umd', sourcemap: true },
            { file: `packages/autocomplete-sdk/dist/browser/${sdkName}.amd.js`, name: camelCase(sdkName), format: 'amd', sourcemap: true },
            { file: `packages/autocomplete-sdk/dist/browser/${sdkName}.es.js`, name: camelCase(sdkName), format: 'es', sourcemap: true },
            { file: `packages/autocomplete-sdk/dist/browser/${sdkName}.cjs.js`, name: camelCase(sdkName), format: 'cjs', sourcemap: true },
            { file: `packages/autocomplete-sdk/dist/browser/${sdkName}.min.js`, name: camelCase(sdkName), format: 'iife', sourcemap: true },
            { file: `packages/autocomplete-sdk/dist/browser/${sdkName}.system.js`, name: camelCase(sdkName), format: 'system', sourcemap: true },
        ],
        plugins: createPlugins('packages/autocomplete-sdk/dist/browser'),
        watch: { include: 'packages/autocomplete-sdk/dist/**' },
    },
];