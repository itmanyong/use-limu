/*
 * @Author: itmanyong
 * @Date: 2021-07-09 09:55:22
 * @LastEditTime: 2021-07-09 11:12:24
 * @LastEditors: itmanyong
 * @Description: 
 * @FilePath: \use-limu\example\src\libs\use-limu-state-object.js
 * ___
 */
import React from 'react';
import useLimu from './use-limu-state';
/**
 * useLimu的对象版本
 * @param {object} initState 源数据 对象 | 返回对象的函数
 * @returns {state, setState, change}
 */
export default function useLimuObject(initState = null) {
	const [state, setState] = useLimu(() =>
		Object.prototype.toString.call(initState) === '[object Object]' ? initState : typeof initState === 'function' ? initState : {},
	);

	React.useEffect(() => {
		if (!Object.prototype.toString.call(initState) === '[object Object]'&&typeof initState != 'function') {
			console.error(`useLimuObject initState not is Object or Function:object`);
		}
	}, []);

	return {
		state,
		setState,
		change: React.useCallback((filedStr, value) => {
			if (filedStr && typeof filedStr === 'string') {
				let filedStrArr = filedStr.split('.');
				let len = filedStrArr.length;
				if (len >= 2) {
					setState((_state) => {
						let obj = _state[filedStrArr[0]];
						for (let i = 1; i < len - 1; i++) {
							obj = obj[filedStrArr[i]];
						}
						obj[filedStrArr[len - 1]] = value;
					});
				} else {
					setState((_state) => {
						_state[filedStr] = value;
					});
				}
			}
		}, [state]),
	};
}
