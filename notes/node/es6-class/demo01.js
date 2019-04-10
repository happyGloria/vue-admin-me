class Point {
	/**
	 * 构造方法; 通过new命令生成对象实例时，自动调用该方法。this代表实例对象；
	 * 一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加；
	 * 类必须使用new调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。
	 * */
	constructor (x, y) {
		this.x = x
		this.y = y
	}
	// 定义“类”的方法,前面不需要加上function这个关键字，直接把函数定义放进去了就可以了
	toString () {
		return `${this.x} + ${this.y}`
	}
}

console.log(typeof Point)  //function类的数据类型就是函数
console.log(Point == Point.prototype.constructor);  //true 类本身就指向构造函数

// 类的所有方法都定义在类的prototype属性上面,以上方式等同于

Point.Prototype = {
	constructor (x, y) {
		this.x = x
		this.y = y
	},
	toString () {
		return `${this.x} + ${this.y}`
	}
}

/**
 * 由于类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。
 * Object.assign方法可以很方便地一次向类添加多个方法。
 * */

Object.assign(Point.prototype, {
	toValue(){
		return '123'
	}
});

/*类的内部所有定义的方法，都是不可枚举的（non-enumerable）。这一点与 ES5 的行为不一致。*/

console.log(Object.keys(Point.prototype));  //类中定义的方法不可枚举，原型上的可以
// []
console.log(Object.getOwnPropertyNames(Point.prototype))


