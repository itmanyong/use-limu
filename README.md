# use-limu

基于limu的react版本

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
	// payload为dispatch传递的参数
	_state.* = *;// 直接修改
}

// dispatch使用
dispatch( actionType, payload )


```
