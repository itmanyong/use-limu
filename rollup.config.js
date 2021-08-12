/*
 * @Author: itmanyong
 * @Date: 2021-07-19 14:52:50
 * @LastEditTime: 2021-08-12 18:29:52
 * @LastEditors: itmanyong
 * @Description:
 * @FilePath: \use-limu\rollup.config.js
 * ___
 */
import babel from 'rollup-plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import { uglify } from 'rollup-plugin-uglify';

// 排除掉react，不作为打包项目
const external = ['react', 'limu'];

export default {
	input: 'src/index.js',
	external,
	output: {
		name: 'use-limu',
		file: 'build/index.js',
		format: 'umd',
		globals: {
			react: 'React',
			limu: 'limu',
		},
	},
	plugins: [
		nodeResolve(),
		terser(),
		babel({
			exclude: '**/node_modules/**',
		}),
		uglify(),
	],
};
