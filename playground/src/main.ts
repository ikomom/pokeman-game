import {
  TextureAtlas,
  audio,
  device,
  game,
  loader, plugin,
  pool, state,
  utils, video,
} from 'melonjs'
import { store } from '@/store'
import FlyEnemyEntity from '@/script/renderables/fly'
import SlimeEnemyEntity from '@/script/renderables/slime'
import CoinEntity from '@/script/renderables/coin'

import './main.css'

import DataManifest from '@/assets/manifest'
import PlayScreen from '@/script/stage/play.js'
import PlayerEntity from '@/script/renderables/player.js'

device.onReady(() => {
  // initialize the display canvas once the device/browser is ready
  if (!video.init(1100, 560, {
    parent: 'app',
    scale: 'auto',
    // scaleMethod: 'flex-width',
    renderer: video.AUTO,
  })) {
    alert('Your browser does not support HTML5 canvas.')
    return
  }

  // initialize the debug plugin in development mode.
  if (import.meta.env.DEV) {
    import('@melonjs/debug-plugin').then((debugPlugin) => {
      // automatically register the debug panel
      utils.function.defer(plugin.register, {}, debugPlugin.DebugPanelPlugin, 'debugPanel')
    })
  }

  // Initialize the audio.
  audio.init('mp3,ogg')

  // allow cross-origin for image/texture loading
  loader.crossOrigin = 'anonymous'

  // set and load all resources.
  loader.preload(DataManifest as any, () => {
    state.set(state.PLAY, new PlayScreen())
    state.transition('fade', '#FFFFFF', 250)
    // set the user defined game stages
    // state.set(state.MENU, new TitleScreen())

    // add our player entity in the entity pool
    pool.register('mainPlayer', PlayerEntity)
    pool.register('SlimeEntity', SlimeEnemyEntity)
    pool.register('FlyEntity', FlyEnemyEntity)
    pool.register('CoinEntity', CoinEntity, true)

    // game
    console.log('game', game)
    store.texture = new TextureAtlas(
      loader.getJSON('texture'),
      loader.getImage('texture'),
    )

    // Start the game.
    state.change(state.PLAY, false)
  })
})
