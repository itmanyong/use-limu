/*
 * @Author: itmanyong
 * @Date: 2021-07-09 09:55:22
 * @LastEditTime: 2021-07-09 11:33:33
 * @LastEditors: itmanyong
 * @Description:
 * @FilePath: \use-limu\example\src\libs\use-limu-state-array.js
 * ___
 */
import React from 'react';
import useLimu from './use-limu-state';
/**
 * useLimuArray是useLimu的数组版本
 * @param {Array} initState 源数组 数组 | 返回数组的函数
 * @param {object} param1 配置项{ idName：''}
 * @returns {state, setState, change}
 */
export default function useLimuArray(initState = [], { idName = null }) {
	const [state, setState] = useLimu(() => (Array.isArray(initState) || typeof initState === 'function' ? initState : []));

	React.useEffect(() => {
		if (!Array.isArray(initState) && !typeof initState === 'function') {
			console.error(`useLimuArray initState not is Array or Function:array`);
		}
	}, []);

	return {
		state,
		setState,
		change: React.useCallback((filedValue = null, payLoad = null) => {
			if (filedValue || filedValue === 0) {
				switch (typeof filedValue) {
					case 'string':
						setState((_state) => {
							const findIndex = _state.findIndex(
								(o) => Object.prototype.toString.call(o) === '[object Object]' && o[idName] && o[idName] == filedValue,
							);
							if (findIndex || findIndex === 0) {
								if (Object.prototype.toString.call(payLoad) === '[object Object]') {
									if (findIndex >= 0) {
										_state[findIndex] = { ..._state[findIndex], ...(payLoad || {}) };
									}
								} else {
									if (findIndex >= 0) {
										_state[findIndex] = payLoad;
									}
								}
							}
						});
						break;
					case 'number':
						setState((_state) => {
							if (
								Object.prototype.toString.call(_state[filedValue]) === '[object Object]' &&
								Object.prototype.toString.call(payLoad) === '[object Object]'
							) {
								_state[filedValue] = {
									..._state[filedValue],
									...payLoad,
								};
							} else {
								_state[filedValue] = payLoad;
							}
						});
						break;

					default:
						break;
				}
			}
		}, []),
	};
}