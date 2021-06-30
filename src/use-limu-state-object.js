import React from 'react';
import useLimu from './use-limu-state';
/**
 * useLimu的对象版本
 * @param {object} initState 源数据
 * @returns {state, setState, change}
 */
export default function useLimuObject(initState) {
	const [state, setState] = useLimu(() => (Object.prototype.toString.call(initState) === '[object Object]' ? initState : {}));

	React.useEffect(() => {
		if (!Object.prototype.toString.call(initState) === '[object Object]') {
			console.error(`useLimuObject initState not is Object`);
		}
	}, []);

	return {
		state,
		setState,
		change: React.useCallBack((filedStr, value) => {
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
		}, []),
	};
}
