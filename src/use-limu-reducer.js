import React from 'react';
import useLimu from './use-limu-state';
/**
 * useReducer的limu版本
 * @param {function} reducer dispatch回调
 * @param {object|function} initState 初始值,对象或返回对象的函数
 * @returns [state,diaptch]
 */
export default function useLimuReducer(reducer, initState = null) {
    const [state, setState] = useLimu(initState);

    const dispatch = React.useRef((action, payload) => setState(draft => reducer(draft, action, payload)));

    return [state, dispatch.current];
}
