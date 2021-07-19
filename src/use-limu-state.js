/*
 * @Author: itmanyong
 * @Date: 2021-07-09 09:55:22
 * @LastEditTime: 2021-07-19 17:22:13
 * @LastEditors: itmanyong
 * @Description:
 * @FilePath: \use-limu\example\src\libs\use-limu-state.js
 * ___
 */
import React from 'react';
import { produce } from 'limu';
import { getType } from './utils';
/**
 * useState的limu版本,与react-useSatte的区别在于可直接修改数据,详见下面example
 * @param {any} initState 初始数据 必须对象或数组,传入函数最终返回一个对象或数组
 * @returns [ state , setState ]
 * @example
 *      1.函数更新状态
 * 			setState((o) => {
 *             o.count++;
 *          })
 *      2.直接返回新状态
 * 			setState({
 * 				count:state.count++
 * 			})
 */
export default function useLimu(initState = null) {
	const [state, setState] = React.useState(() => produce(getType(initState).type === 'function' ? initState() : initState, () => {}));

	return [
		state,
		React.useCallback(
			(updater) => {
				if (getType(updater).type === 'function') {
					setState(produce(state, updater));
				} else {
					setState(produce(updater, () => {}));
				}
			},
			[state],
		),
	];
}
