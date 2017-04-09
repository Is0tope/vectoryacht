import Phaser from 'phaser'
import Vector2 from './Vector2.js'
import mathjs from 'mathjs'

export default class VectorLine {
  constructor (p, v, mag) {
    this.p = p
    this.v = v
    this.mag = mag
  }

  point (t) {
    return Phaser.Point.add(this.p,this.v.multiply(t))
  }

  closestPointToPoint(l){
    let perp = Phaser.Point.perp(this.v)
    let mat = [[perp.x,-this.v.x],[perp.y,-this.v.y]]
    let consts = [[this.p.x-l.x],[this.p.y-l.y]]
    let res = mathjs.multiply(mathjs.inv(mat),consts)
    // get the coordinates of the point
    return this.point(res[1][0])
  }

  closestDistanceToPoint(l) {
    let p = this.closestPointToPoint(l)
    return Phaser.Point.distance(p,l)
  }
}