<!--
 * @Author: itmanyong
 * @Date: 2021-06-30 09:32:18
 * @LastEditTime: 2021-08-12 18:28:30
 * @LastEditors: itmanyong
 * @Description:
 * @FilePath: \use-limu\README.md
 * ___
-->

# use-limu

<a href="https://github.com/tnfe/limu">limu</a> 的react hook版本

## DEMO

<h3><a href="https://codesandbox.io/s/serene-rubin-y5583?file=/src/example-state.js"  target="_blank">综合示例</a></h3>
<h3>

## APIS

### useLimu

```js
// 声明
const [state, setState] = useLimu(initState);
// 修改数据
setState(_state => {
    // 直接修改即可
    _state.xx = xx;
});
setState(newObject); //直接修改整个state
```

### useLimuReducer

```js
// 声明
const [state, dispatch] = useLimuReducer(reducer, initState);

// reducer定义,payload为额外参数,可传可不传
function reducer(_state, action, payload) {
    // _state = state
    _state.xx = xx; // 直接修改
}

// dispatch使用
dispatch(action, payload);
```
