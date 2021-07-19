/*
 * @Author: itmanyong
 * @Date: 2021-07-09 09:54:11
 * @LastEditTime: 2021-07-19 17:01:06
 * @LastEditors: itmanyong
 * @Description:
 * @FilePath: \use-limu\example\src\App.jsx
 * ___
 */
import React from 'react';
import { useLimu, useLimuReducer, useLimuObject, useLimuArray } from './libs/index';

function App() {
	return (
		<div className='App'>
			<LimuState />
			<LimuReducer />
			<LimuObject />
			<LimuArray />
		</div>
	);
}

export default App;

// useLimu
function LimuState(props) {
	// 对象
	const [count, setCount] = useLimu({ count: 666 });
	// 数组
	const [arr, setArr] = useLimu([1, 2, 3, 4, 5, 6]);
	return (
		<ul>
			<h3>useLimu</h3>
			<li>
				<span>对象：</span>
				<span>{count.count}</span>
				<span>
					<button
						onClick={() =>
							setCount((o) => {
								o.count++;
							})
						}>
						inc
					</button>
				</span>
				<span>
					<button
						onClick={() =>
							setCount({
								count: count.count - 1,
							})
						}>
						dnc
					</button>
				</span>
			</li>
			<li>
				<span>数组：</span>
				<span>{arr[1]}</span>
				<span>
					<button
						onClick={() =>
							setArr((o) => {
								o[1]++;
							})
						}>
						inc
					</button>
				</span>
				<span>
					<button
						onClick={() => {
							let newArr = [...arr];
							newArr[1]--;
							setArr(newArr);
						}}>
						dnc
					</button>
				</span>
			</li>
		</ul>
	);
}
// useLimuReducer
function LimuReducer(props) {
	const [state, dispatch] = useLimuReducer(
		(o, c, s) => {
			switch (c) {
				case 'addAge':
					o.age++;
					break;
				case 'dncAge':
					o.age--;
					break;
				case 'changeName':
					o.name = s;
				default:
					break;
			}
		},
		{ age: 666, name: '张三' },
	);

	return (
		<ul>
			<h3>useLimuReducer</h3>
			<li>
				<span>name：</span>
				<span>{state.name}</span>
				<input value={state.name} onChange={(e) => dispatch('changeName', e.target.value)} />
			</li>
			<li>
				<span>age：</span>
				<span>{state.age}</span>
				<button onClick={() => dispatch('addAge')}>addAge</button>
				<button onClick={() => dispatch('dncAge')}>dncAge</button>
			</li>
		</ul>
	);
}
// useLimuObject
function LimuObject(props) {
	const { state, setState, change } = useLimuObject({
		name: '李四',
		age: 23,
		rmb: {
			cash: 6666666666,
			check: 888888888,
		},
	});

	return (
		<ul>
			<h3>useLimuObject</h3>
			<li>
				<span>修改一级属性name：</span>
				<span>{state.name}</span>
				<input value={state.name} onChange={(e) => change('name', e.target.value)} />
			</li>
			<li>
				<span>修改多级属性rmb.cash：</span>
				<span>{state.rmb.cash}</span>
				<input value={state.rmb.cash} onChange={(e) => change('rmb.cash', e.target.value)} />
			</li>
		</ul>
	);
}
// useLimuArray
function LimuArray(props) {
	const { state, setState, change } = useLimuArray([555, { id: 2, name: '王五', age: 99 }], { idName: 'id' });
	const { state: state2, add, remove } = useLimuArray([{ id: `1` }], { idName: 'id' });

	const add_after = () => {
		add(state2.length, 0, { id: `${state2.length}` }, { id: `${state2.length + 1}` });
	};

	const add_before = () => {
		add(0, 0, { id: `${2 - state2.length}` }, { id: `${1 - state2.length}` });
	};

	const delIndex = (index) => {
		remove(index);
	};

	const delId = (item) => {
		remove(item.id);
	};

	const fore = () => {
		setState((_state) => {
			_state.forEach((o, i) => {
				if (o.id) {
					o.name = '王二麻子';
					o.age = 666;
				}
			});
		});
	};
	console.log(state);
	return (
		<ul>
			<button onClick={() => fore()}>修改{state[1].name}</button>
			<h3>useLimuArray</h3>
			<li>
				<span>按照下标修改</span>
				<span>{state[0]}</span>
				<input value={state[0]} onChange={(e) => change(0, e.target.value)} />
			</li>
			<li>
				<span>按照指定标识字段修改state[1].age：</span>
				<span>{state[1].age}</span>
				<input value={state[1].age} onChange={(e) => change(`${state[1].id}`, { age: e.target.value })} />
			</li>
			<li style={{ marginTop: 20 }}>
				<div>
					当前数据：<button onClick={add_after}>末尾新增</button>
					<button onClick={add_before}>首部新增</button>
				</div>
				<div>
					{state2.map((o, i) => (
						<div key={i}>
							{JSON.stringify(o)}-----<button onClick={() => delIndex(i)}>下标删除</button>-
							<button onClick={() => delId(o)}>标识字段删除</button>
						</div>
					))}
				</div>
			</li>
		</ul>
	);
}
