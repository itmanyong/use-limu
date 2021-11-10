import React from 'react';
import { produce } from 'limu';
import { getType } from './utils';
/**
 * useState的limu版本
 * @param {object|function} initState 初始化数据,最终值必须是对象,也可以是返回对象的函数(异步函数也可)
 * @returns [state,setState]
 */
export default function useLimu(initState) {
    const [state, setState] = React.useState(() => produce(getType(initState).type === 'function' ? initState() : initState, () => {}));
    // 防止重复生成更新函数导致无效渲染
    const setStateRef = React.useRef(updater => {
        switch (getType(updater).type) {
            case 'function':
                setState(s => produce(s, updater));
                break;
            case 'object':
                setState(produce(updater, () => {}));
                break;
        }
    });

    return [state, setStateRef.current];
}
