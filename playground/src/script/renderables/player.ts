import { Entity } from 'melonjs'

class PlayerEntity extends Entity {
  /**
     * constructor
     */
  constructor(x, y, settings) {
    // call the parent constructor
    super(x, y, settings)

    console.log('this.renderable', this)

    // set a renderable
    // this.renderable = game.texture.createAnimationFromName([
    //   'walk0001.png', 'walk0002.png', 'walk0003.png',
    //   'walk0004.png', 'walk0005.png', 'walk0006.png',
    //   'walk0007.png', 'walk0008.png', 'walk0009.png',
    //   'walk0010.png', 'walk0011.png',
    // ])
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
