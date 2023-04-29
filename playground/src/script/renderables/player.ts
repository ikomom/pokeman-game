import type { Sprite } from 'melonjs'
import { Entity, audio, collision, game, input } from 'melonjs'
import { store } from '@/store'

class PlayerEntity extends Entity {
  // 最大跳跃数
  multipleJump: number
  jumping = false
  sprite: Sprite
  ANIMATE = {
    WALK: 'walk',
    JUMP: 'jump',
    STAND: 'stand',
  }

  KEY = {
    LEFT: 'left',
    RIGHT: 'right',
    UP: 'up',
    DOWN: 'down',
    SPACE: 'space',
  }

  constructor(x, y, settings) {
    // call the parent constructor
    super(x, y, settings)

    console.log('this.renderable', this, game.viewport.AXIS.BOTH)
    // 视角跟随
    game.viewport.follow(this, game.viewport.AXIS.BOTH, 0.1)
    // 角色能离开视口存活（跳到地图外时不销毁）
    this.alwaysUpdate = true

    // 设置渲染
    this.sprite = store.texture!.createAnimationFromName([
      'walk0001.png', 'walk0002.png', 'walk0003.png',
      'walk0004.png', 'walk0005.png', 'walk0006.png',
      'walk0007.png', 'walk0008.png', 'walk0009.png',
      'walk0010.png', 'walk0011.png',
    ])
    this.sprite.addAnimation(this.ANIMATE.STAND, [{ name: 'walk0001.png', delay: 200 }])
    this.sprite.addAnimation(this.ANIMATE.WALK, [{ name: 'walk0001.png', delay: 100 }, { name: 'walk0002.png', delay: 100 }, { name: 'walk0003.png', delay: 100 }])
    this.sprite.addAnimation(this.ANIMATE.JUMP, [{ name: 'walk0004.png', delay: 150 }, { name: 'walk0005.png', delay: 150 }, { name: 'walk0006.png', delay: 150 }, { name: 'walk0002.png', delay: 150 }, { name: 'walk0001.png', delay: 150 }])
    this.sprite.setCurrentAnimation(this.ANIMATE.STAND)
    this.renderable = this.sprite
    this.anchorPoint.set(0.5, 1.0)
    // 碰撞类型
    this.body.collisionType = collision.types.PLAYER_OBJECT
    // 最大速度
    this.body.setMaxVelocity(3, 20)
    //  摩擦力
    this.body.setFriction(0.4, 0)

    this.multipleJump = 1

    input.bindKey(input.KEY.LEFT, this.KEY.LEFT)
    input.bindKey(input.KEY.A, this.KEY.LEFT)

    input.bindKey(input.KEY.RIGHT, this.KEY.RIGHT)
    input.bindKey(input.KEY.D, this.KEY.RIGHT)

    input.bindKey(input.KEY.SPACE, this.KEY.SPACE)

    // input.bindGamepad(0, { type: 'buttons', code: input.GAMEPAD.BUTTONS.LEFT }, input.KEY.LEFT)
  }

  /**
     * update the entity
     */
  update(dt) {
    // 左右
    if (input.isKeyPressed(this.KEY.LEFT)) {
      // console.log('left press', this.body.maxVel, this.body.force.x)
      if (this.body.vel.y === 0)
        this.sprite.setCurrentAnimation(this.ANIMATE.WALK)
      this.body.force.x = -this.body.maxVel.x
      this.sprite.flipX(true)
    }
    else if (input.isKeyPressed(this.KEY.RIGHT)) {
      if (this.body.vel.y === 0)
        this.sprite.setCurrentAnimation(this.ANIMATE.WALK)
      this.body.force.x = this.body.maxVel.x
      this.sprite.flipX(false)
    }

    // 跳跃
    if (input.isKeyPressed(this.KEY.SPACE)) {
      this.sprite.setCurrentAnimation(this.ANIMATE.JUMP)
      // this.body.jumping && console.log('this.body.jumping', this.body.jumping)
      if (!this.jumping) {
        // this.body.jumping = true
        this.jumping = true
        // this.body.jumping = true
        this.body.force.y = -this.body.maxVel.y
        audio.stop('jump')
        audio.play('jump', false)
      }
    }
    // else if (!this.body.falling) {
    //   this.multipleJump = 1
    // }
    if (this.body.force.x === 0 && this.body.force.y === 0)
      this.sprite.setCurrentAnimation('stand')

    // this.body.jumping && console.log('this.body.jumping', this.body.jumping)

    // else {
    //   this.sprite.setCurrentAnimation(this.ANIMATE.STAND)
    // }

    return super.update(dt)
  }

  /**
     * colision handler
     * (called when colliding with other objects)
     */
  onCollision(response, other) {
    // console.log('onColision', { response, other })
    // Make all other objects solid
    if (this.jumping && this.body.falling)
      this.jumping = false

    return true
  }
}

export default PlayerEntity
