import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default [
  // ES Module build (minified)
  {
    input: 'index.js',
    output: {
      file: 'dist/webcake-data.esm.min.js',
      format: 'es',
      banner: '/* WebCake Data - Database Client Library | https://github.com/vuluu2k/webcake-data */',
    },
    plugins: [
      nodeResolve(),
      terser({
        compress: {
          drop_console: false,
          passes: 2
        },
        format: {
          comments: /^!/
        }
      })
    ]
  },
  // UMD build (minified) for browser
  {
    input: 'index.js',
    output: {
      file: 'dist/webcake-data.umd.min.js',
      format: 'umd',
      name: 'WebCakeData',
      exports: 'named',
      banner: '/* WebCake Data - Database Client Library | https://github.com/vuluu2k/webcake-data */',
    },
    plugins: [
      nodeResolve(),
      terser({
        compress: {
          drop_console: false,
          passes: 2
        },
        format: {
          comments: /^!/
        }
      })
    ]
  },
  // ES Module build (unminified for development)
  {
    input: 'index.js',
    output: {
      file: 'dist/webcake-data.esm.js',
      format: 'es',
      banner: '/* WebCake Data - Database Client Library | https://github.com/vuluu2k/webcake-data */',
    },
    plugins: [
      nodeResolve()
    ]
  },
  // UMD build (unminified for development)
  {
    input: 'index.js',
    output: {
      file: 'dist/webcake-data.umd.js',
      format: 'umd',
      name: 'WebCakeData',
      exports: 'named',
      banner: '/* WebCake Data - Database Client Library | https://github.com/vuluu2k/webcake-data */',
    },
    plugins: [
      nodeResolve()
    ]
  }
];

