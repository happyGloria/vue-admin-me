var obj = {...{name: 'zhangsan'}, ...{name: 'wangwu', age: 20}}
console.log(obj) //{ name: 'wangwu', age: 20 }

var arr1 = [0, 1, 2]
var arr2 = [...arr1, 3, 4, 5]
console.log(arr2)  //[ 0, 1, 2, 3, 4, 5 ]

var arr3 = [0, 1].concat(['a', 'b'], ['x', 'y'])
var arr4 = [...[0, 1], ...['a', 'b'], ...['x', 'y']]
console.log(arr3)  // [ 0, 1, 'a', 'b', 'x', 'y' ]
console.log(arr4)  // [ 0, 1, 'a', 'b', 'x', 'y' ]

//在中间插入数组
var parts = ['shoulder', 'knees']
var lyrics = ['head', ...parts, 'toes']
console.log(lyrics) // [ 'head', 'shoulder', 'knees', 'and', 'toes' ]

//将一个数组添加到另一个数组的尾部
var arr5 = [1, 2]
var arr6 = ['a', 'b']
//Array.prototype.push.apply(arr5, arr6)
arr5.push(...arr6)
console.log(arr5)  //[ 1, 2, 'a', 'b' ]

// 数组加上对象返回新的数组
let g = [{gg: 'gg'}]
let h = {hh: 'hh'}
let i = [...g, h] 	//[{"gg":"gg"},{"hh":"hh"}]
console.log(i)
// 数组+字符串
let j = ['jj', 'gg']
let k = 'kk'
let l = [...j, k]  // ["jj", "gg", "kk"]
console.log(l)

// 带有数组和对象的集合
let state = {
	resultList: [],
	currentPage: 0,
	totalRows: {}
}
let data = {
	resultList: [{new: 'new'}],
	currentPage: 2,
	totalRows: {row: 'row'}
}
let combile = {
	...state,
	resultList: [
		...state.resultList,
		...data.resultList
	],
	currentPage: data.currentPage,
	totalRows: data.totalRows
}
console.log(combile)
/*
	{
		'resultList': [{'new': 'new'}],
		'currentPage': 2,
		'totalRows': {'row': 'row'}
	}
*/
