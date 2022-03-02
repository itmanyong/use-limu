/*
 * @Author: itmanyong
 * @Date: 2021-07-19 17:26:34
 * @LastEditors: Please set LastEditors
 * @Description: now file Description
 * @LastEditTime: 2022-03-02 15:45:44
 * @FilePath: \use-limu\src\use-limu-state.js
 */
import { produce } from 'limu';
import React from 'react';
import { getType } from './utils';
/**
 * useState的limu hook版本
 * @param {Object|()=>Object} initialValue 初始化数据,对象或返回对象的函数
 * @returns [state,setState]
 */
export default function useLimu(initialValue = {}) {
    const [state, set] = React.useState(Object.freeze(() => produce(getType(initialValue).type === 'function' ? initialValue() : initialValue, () => { })));

    const setRef = React.useRef(updater => {
        switch (getType(updater).type) {
            case 'function':
                set(s => produce(s, updater));
                break;
            case 'object':
                set(Object.freeze(produce(updater, () => { })))
                break;
        }
    })

    return [state, setRef.current];
}
