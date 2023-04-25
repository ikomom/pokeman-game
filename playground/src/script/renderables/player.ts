import { Entity, collision, game } from 'melonjs'
import { store } from '@/store'

class PlayerEntity extends Entity {
  /**
     * constructor
     */
  constructor(x, y, settings) {
    // call the parent constructor
    super(x, y, settings)

    console.log('this.renderable', this, game.viewport.AXIS.BOTH)
    game.viewport.follow(this, game.viewport.AXIS.BOTH, 0.1)
    this.body.collisionType = collision.types.PLAYER_OBJECT

    this.body.setMaxVelocity(3, 15)
    this.body.setFriction(0.4, 0)

    // set a renderable
    if (store.texture) {
      this.renderable = store.texture.createAnimationFromName([
        'walk0001.png', 'walk0002.png', 'walk0003.png',
        'walk0004.png', 'walk0005.png', 'walk0006.png',
        'walk0007.png', 'walk0008.png', 'walk0009.png',
        'walk0010.png', 'walk0011.png',
      ])
      this.renderable.addAnimation('stand', [{ name: 'walk0001.png', delay: 100 }])
      this.renderable.addAnimation('walk', [{ name: 'walk0001.png', delay: 100 }, { name: 'walk0002.png', delay: 100 }, { name: 'walk0003.png', delay: 100 }])
      this.renderable.addAnimation('jump', [{ name: 'walk0004.png', delay: 150 }, { name: 'walk0005.png', delay: 150 }, { name: 'walk0006.png', delay: 150 }, { name: 'walk0002.png', delay: 150 }, { name: 'walk0001.png', delay: 150 }])
      this.renderable.setCurrentAnimation('stand')
      this.anchorPoint.set(0.5, 1.0)
    }
  }

  /**
     * update the entity
     */
  update(dt) {
    // change body force based on inputs
    // ....
    // call the parent method
    return super.update(dt)
  }

  /**
     * colision handler
     * (called when colliding with other objects)
     */
  onCollision(response, other) {
    // Make all other objects solid
    return true
  }
}

export default PlayerEntity
