import Phaser from 'phaser'
import Vector2 from '../math/Vector2'
import VectorLine from '../math/VectorLine'

export default class Map{
  constructor(options) {
    this.width = options.width
    this.height = options.height
    this.numWindVectors = options.numWindVectors
    this.windVectors = this.generateWindVectors(this.numWindVectors)
    this.windVectorLines = this.generateDisplayVectors(this.windVectors)
    this.windMap = this.generateWindMap(this.windVectors,30,20)

  }

  randAngle(){
  	return Math.PI * (game.rnd.angle()/180)
  }

  generateRandomWindVector() {
  	let c = new Phaser.Point(game.rnd.between(0,this.width),game.rnd.between(0,this.height))
  	let rang = this.randAngle()
  	let v = new Vector2(Math.cos(rang),Math.sin(rang))
  	// TODO: Make this random maybe?
  	let mag = 10
  	return new VectorLine(c, v, 40)
  }

  generateWindVectors(n) {
  	let wvs = new Array()
  	for(let i = 0;i<n;i++){
  		wvs.push(this.generateRandomWindVector())
  	}
  	return wvs
  }

  generateWindMap(wvs,xden,yden) {
  	let xstep = Math.floor(this.width/xden)
  	let ystep = Math.floor(this.height/yden)
  	let vecs = []
  	for(let i=0;i<xden;i++){
  		for(let j=0;j<yden;j++){
  			let p = {x:i*xstep, y:j*ystep}
  			let w = this.windAtPoint(p)
  			let l = new Phaser.Line(p.x,p.y,p.x+w.x,p.y+w.y)
        let c = new Phaser.Circle(p.x,p.y,4)
  			vecs.push([l,c])
  		}
  	}
  	return vecs
  }

  generateDisplayVectors(vs) {
  	return vs.map((v) => {
  		let s = v.point(-1000)
  		let e = v.point(1000)
  		return new Phaser.Line(s.x,s.y,e.x,e.y)
  	})
  }

  renderDisplayVectors(g){
  	this.windVectorLines.map((v) => {
      g.debug.geom(v,'#00cb51')
    })
  }

  renderWindMap(g){
  	this.windMap.map((v) => {
      g.debug.geom(v[0],'#5b00cb')
      g.debug.geom(v[1],'#5b00cb')
    })
  }

  windAtPoint(p){
  	let vec = new Vector2(0,0)
  	this.windVectors.map((v) => {
  		let scale = v.mag / (1+ (0.05*v.closestDistanceToPoint(p)))
  		vec.addI(v.v.multiply(scale))
  	})
  	return vec
  }

  
}
