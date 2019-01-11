import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/app.jsx',
	output: {
		// sourcemap: true,
		format: 'iife',
		file: 'dist/bundle.js',
	},
	plugins: [
		babel({
      exclude: 'node_modules/**',
      plugins: ["jsx-dom-expressions"]
    }),
    resolve({ extensions: ['.js', '.jsx'] }),
		production && terser()
  ]
};