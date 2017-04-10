import Phaser from 'phaser'

export default class Boat extends Phaser.Sprite {
  constructor (game, x, y) {
    super(game, x, y, 'boat')
    this.game = game
    this.scale.setTo(0.3,0.3)
    this.anchor.setTo(0.5,0.5)

    this.sailSprite = game.add.sprite(0,-10, 'sail');

    this.addChild(this.sailSprite)

    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.enable(this,false);

    this.sailSprite.body.collides([])
    this.sailSprite.anchor.setTo(0.05,0.5)

    this.sailAngle = 0
    this.sailSprite.body.angle = this.sailAngle + 90

    this.checkWorldBounds = true
    this.events.onOutOfBounds.add((x) => {
      this.body.reverse()
    },this)

  }

  applyWind(wv) {
  	this.body.force.x = wv.x
    this.body.force.y = wv.y
  }

  rotateSail(n) {
  	let newAngle = this.sailAngle + n
  	if(Math.abs(newAngle) > 80){
  		return
  	}
  	this.sailAngle = newAngle
  }

  update () {
	this.body.angle = 90+game.math.radToDeg(Math.atan2(this.body.velocity.y,this.body.velocity.x))
	this.sailSprite.body.angle = this.sailAngle + 90
  }
}
