import Phaser from 'phaser'

export default class Vector2 extends Phaser.Point {
  multiply(t) {
  	return new Vector2(t*this.x,t*this.y)
  }

  multiplyI(t) {
  	this.x *= t
  	this.y *= t
  }

  addI(v) {
  	this.x += v.x
  	this.y += v.y
  }
}