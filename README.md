<!--
 * @Author: itmanyong
 * @Date: 2021-06-30 09:32:18
 * @LastEditTime: 2021-07-09 13:42:01
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
//2.赋值式
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

### useLimuObject

```js
const { state, setState, change } = useLimuObject(initState);

// 1.state、setState等同于useLimu的两个参数
// 2.change为简化更新state数据的方法
// change使用：支持链路式修改
// 例如  initState = { name: '张三', rmb: { cash: 6666 } };
change('rmb.cash', 9999999999);

```

### useLimuArray
```js
const { state, setState, change } = useLimuArray(initState, { idName: null });
// change支持两种传值修改方式
// 1.下标修改式  change(下标,新值) 下标必须为number,新值和下标表示的值都为对象即解构融合,否则直接替换
change(index,newState)
// 2.标识字段更新式 change(标识的字段值,新值) 标识值不能为number，新值和标识值所在的解构都为对象为结构融合，否则直接替换
change(id,newState)
```
