import { loadAssets } from './assetsLoader'
import { createInstance } from './core/kaboom'
import { setBattle } from './scenes/battle'
import { setMenu } from './scenes/menu'
import { setWorld } from './scenes/world';

(function () {
  const ctx = createInstance({
    width: 1280,
    height: 720,
    scale: 0.7,
    root: document.getElementById('app') as HTMLElement,
    global: false,
  })
  ctx.setBackground(ctx.Color.fromHex('#36A6E0'))

  loadAssets(ctx)
  const scenes = [
    {
      name: 'menu',
      route: setMenu,
    },
    {
      name: 'world',
      route: setWorld,
    },
    {
      name: 'battle',
      route: setBattle,
    },
  ]
  scenes.forEach((s) => {
    ctx.scene(s.name, worldState => s.route.apply(ctx, worldState))
  })

  ctx.go('menu')
})()
