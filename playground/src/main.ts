import {
  audio,
  device,
  loader,
  plugin,
  pool,
  state,
  utils,
  video,
} from 'melonjs'

import './main.css'

import DataManifest from '@/assets/manifest'
import PlayScreen from '@/script/stage/play.js'
import PlayerEntity from '@/script/renderables/player.js'

import TitleScreen from '@/script/stage/title.js'

device.onReady(() => {
  // initialize the display canvas once the device/browser is ready
  if (!video.init(1218, 562, { parent: 'app', scale: 'auto' })) {
    alert('Your browser does not support HTML5 canvas.')
    return
  }

  // initialize the debug plugin in development mode.
  if (import.meta.env.DEV === 'development') {
    import('@melonjs/debug-plugin').then((debugPlugin) => {
      // automatically register the debug panel
      utils.function.defer(plugin.register, this, debugPlugin.DebugPanelPlugin, 'debugPanel')
    })
  }

  // Initialize the audio.
  audio.init('mp3,ogg')

  // allow cross-origin for image/texture loading
  loader.crossOrigin = 'anonymous'

  // set and load all resources.
  loader.preload(DataManifest as any, () => {
    // set the user defined game stages
    state.set(state.MENU, new TitleScreen())
    state.set(state.PLAY, new PlayScreen())

    // add our player entity in the entity pool
    pool.register('mainPlayer', PlayerEntity)

    // Start the game.
    state.change(state.PLAY, false)
  })
})
