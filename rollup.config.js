/*
 * @Author: itmanyong
 * @Date: 2021-07-19 14:52:50
 * @LastEditors: itmanyong
 * @Description: now file Description
 * @LastEditTime: 2022-02-16 09:17:53
 * @FilePath: \use-limu\rollup.config.js
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
