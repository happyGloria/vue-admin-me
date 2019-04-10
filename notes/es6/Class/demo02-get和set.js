class Position {
	constructor (x, y) {
		this.x = x
		this.y = y
	}
	get prop () {
		return 'get a property'
	}
	set prop (value) {
		console.log( 'set a property', value )
	}
	update (newX, newY) {
		this.x = newX
		this.y = newY
	}
}