/*
 * @Author: itmanyong
 * @Date: 2021-07-09 09:55:22
 * @LastEditTime: 2021-07-19 17:26:01
 * @LastEditors: itmanyong
 * @Description:
 * @FilePath: \use-limu\example\src\libs\use-limu-state-array.js
 * ___
 */
import React from 'react';
import useLimu from './use-limu-state';
import { getType } from './utils';
/**
 * useLimuArray是useLimu的数组版本
 * @param {Array} initState 源数组 数组 | 返回数组的函数
 * @param {object} param1 配置项{ idName：''}
 * @returns {state, setState, change}
 */
export default function useLimuArray(initState = [], options = {}) {
	const { idName = null } = options;
	const [state, setState] = useLimu(() => (getType(initState).type === 'array' || getType(initState).type === 'function' ? initState : []));

	React.useEffect(() => {
		if (!getType(initState) === 'array' && !getType(initState).type === 'function') {
			console.error(`useLimuArray initState not is Array or Function:array`);
		}
	}, []);

	return {
		state: state,
		setState: setState,
		add: React.useCallback(
			(start, end, ...adds) => {
				console.log(start, end, adds);
				setState((_state) => {
					_state.splice(getType(start).type === 'number' ? start : state.length, getType(end).type === 'number' ? end : 0, ...adds);
				});
			},
			[state],
		),
		remove: React.useCallback(
			(val, len = 1) => {
				setState((_state) => {
					switch (getType(val).type) {
						case 'number':
							_state.splice(val, len);
							break;
						case 'string':
							if (idName) {
								const delIndex = _state.findIndex((o) => o[idName] === val);
								_state.splice(delIndex, len);
							} else {
								console.error(`useLimuArray options.idName 未定义`);
							}
							break;
						default:
							break;
					}
				});
			},
			[state],
		),
		change: React.useCallback(
			(filedValue = null, payLoad = null) => {
				if (filedValue || filedValue === 0) {
					switch (getType(filedValue).type) {
						case 'string':
							if (idName) {
								setState((_state) => {
									const findIndex = _state.findIndex((o) => getType(o) === 'object' && o[idName] && o[idName] == filedValue);
									if (findIndex || findIndex === 0) {
										if (getType(payLoad).type === 'object') {
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
							}
							break;
						case 'number':
							setState((_state) => {
								if (getType(_state[filedValue]).type === 'object' && getType(payLoad).type === 'object') {
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
			},
			[state],
		),
	};
}
