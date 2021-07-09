/*
 * @Author: itmanyong
 * @Date: 2021-07-09 09:54:11
 * @LastEditTime: 2021-07-09 10:39:23
 * @LastEditors: itmanyong
 * @Description: 
 * @FilePath: \use-limu\example\vite.config.js
 * ___
 */
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [reactRefresh()],
	server: {
		port: 9000,
	},
});
