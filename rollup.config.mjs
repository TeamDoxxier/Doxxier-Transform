import typescript from 'rollup-plugin-typescript2';
// import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.ts', // Correct entry point
  output: [
    {
      file: 'dist/bundle.cjs.js',
      format: 'cjs', // CommonJS format
      sourcemap: true,
    },
    {
      file: 'dist/bundle.umd.js',
      format: 'umd', // UMD format
      name: 'DoxxierTransform',
      sourcemap: true,
    },
    {
      file: 'dist/bundle.esm.js',
      format: 'es', // ES Module format
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(), // Resolves node_modules dependencies
    commonjs(), // Converts CommonJS modules to ES6
    typescript({
      tsconfigOverride: { compilerOptions: { module: 'ESNext' } },
    }),
   // terser(), // Minify the output
  ],
};