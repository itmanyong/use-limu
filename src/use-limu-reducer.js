/*
 * @Author: itmanyong
 * @Date: 2021-07-09 09:55:22
 * @LastEditTime: 2021-07-09 11:40:43
 * @LastEditors: itmanyong
 * @Description: 
 * @FilePath: \use-limu\example\src\libs\use-limu-reducer.js
 * ___
 */
import React from 'react';
import useLimu from './use-limu-state';
/**
 * useReducer的limu版本,与react-useReducer的唯一区别是无需返回数据,直接修改,详见下面example
 * @param {function} reducer 事件分发函数,三个参数(state,action,payload)
 * @param {any} initState 初始化数据
 * @returns 【 state , dispatch ]
 * @example
 *    function reducer(state, action,payload) {
 *      switch (action) {
 *        case "increment":
 *          state.count++;
 *          break;
 *        case "decrement":
 *          state.count--;
 *          break;
 *      }
 *    }
 */
export default function useLimuReducer(reducer, initState = null) {
	const [state, setState] = useLimu(initState);

	return [
		state,
		React.useCallback(
			(action, payload) => {
				setState((draft) => reducer(draft, action, payload));
			},
			[state],
		),
	];
}
