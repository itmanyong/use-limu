import React from 'react';
import useLimu from './use-limu-state';
/**
 * useLimuArray是useLimu的数组版本
 * @param {Array} initState 源数组
 * @param {object} param1 配置项{ idName：''}
 * @returns {state, setState, change}
 */
export default function useLimuArray(initState = [], { idName = null }) {
	const [state, setState] = useLimu(() => (Array.isArray(initState) ? initState : []));

	React.useEffect(() => {
		if (!Array.isArray(initState)) {
			console.error(`useLimuArray initState not is Array`);
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
							_state.forEach((o) => {
								if (o[idName] === filedValue) {
									o = { ...o, ...(payLoad || {}) };
								}
							});
						});
						break;
					case 'number':
						setState((_state) => {
							_state.forEach((o, i) => {
								if (i === filedValue) {
									o = payLoad;
								}
							});
						});
						break;

					default:
						break;
				}
			}
		}, []),
	};
}
