/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import VectorLine from '../math/VectorLine'
import Vector2 from '../math/Vector2'
import Map from '../mapping/Map'
import Boat from '../sprites/Boat'

export default class extends Phaser.State {
  init () {}
  preload () {
    this.map = new Map({width : this.world.width,
      height : this.world.height,
      numWindVectors : 2,
      windVectors : [
        [{x:game.world.centerX,y:game.world.centerY},{x:0,y:-1},40],
        [{x:game.world.centerX,y:0},{x:-1,y:0},40],
        [{x:game.world.centerX,y:game.world.centerY},{x:1,y:0},40],
        [{x:game.world.centerX,y:game.world.height},{x:-1,y:0},40],
        [{x:0,y:game.world.centerY},{x:0,y:1},40],
        [{x:game.world.width,y:game.world.centerY},{x:0,y:-1},40]
      ]
    })

    game.load.image('boat', 'assets/images/boat.png');
    game.load.image('sail', 'assets/images/sail.png');

  }

  create () {
    game.input.mouse.capture = true
    this.stage.backgroundColor = '#0073cb'

    this.cursors = game.input.keyboard.createCursorKeys()
    console.log(this.cursors)

    this.boatSprite = new Boat(this,game.world.centerX,game.world.centerY)
    this.game.add.existing(this.boatSprite)
  }

  update() {
    let mousepos = {x:this.game.input.mousePointer.x, y:this.game.input.mousePointer.y}
    let wv = this.map.windAtPoint({x:this.boatSprite.body.x,y:this.boatSprite.body.y})
    this.boatSprite.applyWind(wv)
    this.windDir = new Phaser.Line(this.boatSprite.body.x,this.boatSprite.body.y,
        this.boatSprite.body.x+(10*wv.x),this.boatSprite.body.y+(10*wv.y))
  }

  render() {
    this.map.renderDisplayVectors(game)
    this.map.renderWindMap(game)
    this.game.debug.geom(this.windDir,'#ff0000')
    // this.game.debug.geom(this.intercept,'#0000ff')
    game.world.bringToTop(this.boatSprite)

    // controls
    if(this.cursors.left.isDown){
      this.boatSprite.rotateSail(4)
    }
    if(this.cursors.right.isDown){
      this.boatSprite.rotateSail(-4)
    }
  }

}
