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

基于 limu 的 react 版本

## DEMO

<h3><a href="https://codesandbox.io/s/serene-rubin-y5583?file=/src/example-state.js"  target="_blank">综合示例</a></h3>
<h3>

## APIS

### useLimu

```js
// 使用同useState
const [state, setState] = useLimu(initState);

// setState使用
//1.函数式
setState( _state => {
	// 可直接修改 _state 的值,会响应至state
	_state.* = **;
})
//2.赋值式，替换整个state
setState(newState)
```

### useLimuReducer

```js
// 使用同useReducer
const [state, dispatch] = useLimuReducer(reducer, initState);

// reducer定义
function reducer( _state, action, payload ){
	// _state = state
	_state.* = *;// 直接修改
}

// dispatch使用
dispatch( action, payload )


```
