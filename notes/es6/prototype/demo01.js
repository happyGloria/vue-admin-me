function Super () {
}
Super.prototype.func = function () {
}
/*
var s = new Super();
console.log(s)
console.log(s.prototype)
console.log(s.__proto__)*/

// 通过call方式实现继承

var sub1 = {}
sub1.__proto = Super.prototype
Super.call(sub1)
console.log(sub1)

var sub2 = new Super()
console.log('sub2.__proto__ === Super.prototype:', sub2.__proto__ === Super.prototype) // true

