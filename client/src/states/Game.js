/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import VectorLine from '../math/VectorLine'
import Vector2 from '../math/Vector2'
import Map from '../mapping/Map'

export default class extends Phaser.State {
  init () {}
  preload () {
    this.map = new Map({width : this.world.width,
      height : this.world.height,
      numWindVectors : 4})

    game.load.image('boat', 'assets/images/boat.png');
    game.load.image('sail', 'assets/images/sail.png');

  }

  create () {
    game.input.mouse.capture = true
    this.stage.backgroundColor = '#0073cb'
    //this.text = game.add.text(250, 16, 'sdsdsds', { fill: '#0000FF' });
    this.boatSprite = game.add.sprite(game.world.centerX, game.world.centerY, 'boat');
    this.boatSprite.scale.setTo(0.3,0.3)
    this.boatSprite.anchor.setTo(0.5,0.5)

    this.sailSprite = game.add.sprite(27,27, 'sail');
    //this.sailSprite.scale.setTo(0.3,0.3)
    this.boatSprite.addChild(this.sailSprite)
    this.sailSprite.anchor.setTo(0,0.5)


    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.enable(this.boatSprite,false);

    this.boatSprite.checkWorldBounds = true
    this.boatSprite.events.onOutOfBounds.add((x) => {
      this.boatSprite.body.reverse()
    },this)

  }

  update() {
    let mousepos = {x:this.game.input.mousePointer.x, y:this.game.input.mousePointer.y}
    let wv = this.map.windAtPoint({x:this.boatSprite.body.x,y:this.boatSprite.body.y})
    this.boatSprite.body.force.x = wv.x
    this.boatSprite.body.force.y = wv.y
    this.windDir = new Phaser.Line(this.boatSprite.body.x,this.boatSprite.body.y,
        this.boatSprite.body.x+(10*wv.x),this.boatSprite.body.y+(10*wv.y))
    this.boatSprite.body.angle = 90+game.math.radToDeg(Math.atan2(this.boatSprite.body.velocity.y,this.boatSprite.body.velocity.x))
  }

  render() {
    this.map.renderDisplayVectors(game)
    this.map.renderWindMap(game)
    this.game.debug.geom(this.windDir,'#ff0000')
    // this.game.debug.geom(this.intercept,'#0000ff')
    game.world.bringToTop(this.boatSprite)
  }

}
