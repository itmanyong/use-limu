/*
 * @Author: itmanyong
 * @Date: 2021-07-19 17:19:25
 * @LastEditTime: 2022-02-16 09:46:11
 * @LastEditors: itmanyong
 * @Description:
 * @FilePath: \use-limu\src\utils.js
 * ___
 */

/**
 * 获取数据类型
 * @param {any} arg 数据
 * @returns { type: string,name:any}
 */
 export function getType(arg) {
	let t,
		type = (arg) => ((t = typeof arg) === 'object' ? {}.toString.call(arg).slice(8, -1).toLowerCase() : t),
		name = (arg) => ((t = type(arg)) === 'function' ? arg.name : t === 'undefined' ? undefined : arg.constructor.name);
	return { type: type(arg), name: name(arg) };
}
