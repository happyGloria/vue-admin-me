function Position (x, y) {
	this.x = x
	this.y = y
}
Position.prototype.update = function (newX, newY) {
	this.x = newX
	this.y = newY
}

//改写
class Position {
	constructor (x, y) {
		this.x = x
		this.y = y
	}
	update (newX, newY) {
		this.x = newX
		this.y = newY
	}
}

//类的继承

class subPosition extends Position {
	constructor (x, y, desc) {
		super (x, y)
		this.desc = desc
	}
}

