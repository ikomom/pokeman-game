import { loadAssets } from './assetsLoader'
import { createInstance } from './core/kaboom'
import { setBattle } from './scenes/battle'
import { setWorld } from './scenes/world';

(function bootstrap() {
  const instance = createInstance({
    width: 1280,
    height: 720,
    scale: 0.7,
  })

  instance.setBackground(instance.Color.fromHex('#36A6E0'))
  loadAssets(instance)
  instance.scene('world', worldState => setWorld(instance, worldState))
  instance.scene('battle', worldState => setBattle(instance, worldState))
  instance.go('world')
})()
