/*
 * @Author: itmanyong
 * @Date: 2021-07-09 09:54:11
 * @LastEditTime: 2021-07-19 15:41:53
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
		port: 9001,
	},
});
