import Phaser from 'phaser'
import Vector2 from '../math/Vector2'
import VectorLine from '../math/VectorLine'

export default class Map{
  constructor(options) {
    this.width = options.width
    this.height = options.height
    
    this.defaultWindStrength = 40
    if('windVectors' in options){
      this.numWindVectors = options.windVectors.length
      this.windVectors = options.windVectors.map((x)=>{return this.generateWindVector(x[0],x[1],x[2])})
    }else{
      this.numWindVectors = options.numWindVectors
      this.windVectors = this.generateWindVectors(this.numWindVectors)
    }
    console.log(this.windVectors)
    this.windVectorLines = this.generateDisplayVectors(this.windVectors)
    this.windMap = this.generateWindMap(this.windVectors,30,20)

  }

  randAngle(){
  	return Math.PI * (game.rnd.angle()/180)
  }

  generateRandomWindVector() {
  	let c = {x:game.rnd.between(0,this.width),y:game.rnd.between(0,this.height)}
  	let rang = this.randAngle()
  	let v = {x:Math.cos(rang),y:Math.sin(rang)}
  	// TODO: Make this random maybe?
  	return generateWindVector(c, v, this.defaultWindStrength)
  }

  generateWindVector(c,v,s){
    let c2 = new Phaser.Point(c.x,c.y)
    let v2 = new Vector2(v.x,v.y)
    return new VectorLine(c2, v2, s)
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
