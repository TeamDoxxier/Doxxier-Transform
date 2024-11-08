import typescript from 'rollup-plugin-typescript2';
// import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';

export default {
  input: 'src/index.ts', // Correct entry point
  output: [
    {
      file: 'dist/bundle.umd.js',
      format: 'umd', // UMD format
      name: 'DoxxierTransform',
      sourcemap: true,
      globals: {
        '@imagemagick/magick-wasm': 'MagickWASM',
      },
    },
    {
      file: `dist/bundle.d.ts`,
      format: 'es',
    },
    {
      file: 'dist/bundle.esm.js',
      format: 'es', // ES Module format
      sourcemap: true,
      globals: {
        '@imagemagick/magick-wasm': 'MagickWASM',
      },
    },
    {
      file: 'dist/bundle.cjs.js',
      format: 'cjs', // CommonJS format
      sourcemap: true,
      globals: {
        '@imagemagick/magick-wasm': 'MagickWASM',
      },
    },
  ],
  plugins: [
    typescript({
      tsconfig: 'tsconfig.json',
      clean: true,
      useTsconfigDeclarationDir: true,
    }),
    resolve(),
    commonjs(), 
    copy({
      targets: [
        {
          src: './node_modules/@imagemagick/magick-wasm/dist/magick.wasm',
          dest: 'dist/public',
        },
      ],
    }),
  ],
};