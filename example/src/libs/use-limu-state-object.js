/*
 * @Author: itmanyong
 * @Date: 2021-07-09 09:55:22
 * @LastEditTime: 2021-07-19 17:23:41
 * @LastEditors: itmanyong
 * @Description:
 * @FilePath: \use-limu\example\src\libs\use-limu-state-object.js
 * ___
 */
import React from 'react';
import useLimu from './use-limu-state';
import { getType } from './utils';
/**
 * useLimu的对象版本
 * @param {object} initState 源数据 对象 | 返回对象的函数
 * @returns {state, setState, change}
 */
export default function useLimuObject(initState = null) {
	const [state, setState] = useLimu(() =>
		getType(initState).type === 'object' ? initState : getType(initState).type === 'function' ? initState : {},
	);

	React.useEffect(() => {
		if (!getType(initState).type === 'object' && !getType(initState).type === 'function') {
			console.error(`useLimuObject initState not is Object or Function:object`);
		}
	}, []);

	return {
		state,
		setState,
		change: React.useCallback((filedStr, value) => {
			if (filedStr &&  getType(filedStr).type === 'string') {
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
		}, []),
	};
}
