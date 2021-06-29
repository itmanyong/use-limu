import React from 'react';
import { produce } from 'limu';
/**
 * useState的limu版本,与react-useSatte的区别在于可直接修改数据,详见下面example
 * @param {any} initState 初始数据 default=null
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
	const [state, setState] = React.useState(() => produce(typeof initState === 'function' ? initState() : initState, () => {}));

	return [
		state,
		React.useCallback(
			(updater) => {
				if (typeof updater === 'function') {
					setState(produce(state, updater));
				} else {
					setState(produce(updater, () => {}));
				}
			},
			[state],
		),
	];
}
