/*
 * @Author: itmanyong
 * @Date: 2021-07-19 17:26:34
 * @LastEditors: itmanyong
 * @Description: now file Description
 * @LastEditTime: 2022-02-16 09:44:34
 * @FilePath: \use-limu\src\use-limu-reducer.js
 */
import React from 'react';
import useLimu from './use-limu-state';
/**
 * useReducer的limu hook版本
 * @param {function} reducer dispatch回调
 * @param {Object|()=>Object} initialValue 初始化数据,对象或返回对象的函数
 * @returns [state,diaptch]
 */
export default function useLimuReducer(reducer, initialValue = {}) {
    const [state, set] = useLimu(initialValue);

    const dispatch = React.useRef((action, payload) => set(draft => reducer(draft, action, payload)));

    return [state, dispatch.current];
}
