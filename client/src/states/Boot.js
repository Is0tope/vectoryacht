import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#0073cb'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
  }

  preload () {
    this.fontsLoaded()
  }

  render () {
    if (this.fontsReady) {
      this.state.start('Splash')
    }
    this.state.start('Splash')
  }

  fontsLoaded () {
    console.log('Fonts Ready')
    this.fontsReady = true
  }
}
