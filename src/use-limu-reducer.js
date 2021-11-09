import React from 'react';
import useLimu from './use-limu-state';
/**
 * useReducer的limu版本
 * @param {function} reducer 回调函数,三个参数(数据本身,类型参数,额外参数)
 * @param {object|function} initState 初始化参数,对象或返回对象的函数
 * @returns [state,setState]
 */
export default function useLimuReducer(reducer, initState = null) {
    const [state, setState] = useLimu(initState);

    const dispatchRef = React.useRef((action, payload) => setState(draft => reducer(draft, action, payload)));

    return [state, dispatchRef.current];
}
