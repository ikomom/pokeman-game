import type { KaboomCtx } from 'kaboom'
import type { WorldState } from '../core/types'

export function setMenu(this: KaboomCtx, worldState?: WorldState) {
  const curSize = 48
  const pad = 24

  const input = this.add([
    'menuList',
    'clickable',
    // 设置位置为左上角
    this.pos(pad, pad),
    this.body({
      jumpForce: 30,
      gravityScale: 0.8,
    }),
    this.area(),
    // this.sprite('npc'),
    // this.scale(4),
    // 使用text()组件渲染文字
    this.text('开始游戏', {
      // 设置字体为默认字体
      // font: 'sink',
      // 设置宽度为屏幕宽度减去两边的边距
      width: this.width() - pad * 2,
      // 设置文字大小
      size: curSize,
      align: 'center',
      // 设置行间距和字间距
      lineSpacing: 8,
      letterSpacing: 4,
    }),
  ])
  // this.setGravity(8)
  input.on('click', (e) => {
    console.log('onCLick', e)
  })

  console.log('world test', { worldState, input })
  // this.onClick(() => {
  //   console.log('click global')
  // })
  this.onClick('menuList', (a) => {
    console.log('click menuList', a)
    this.go('world')
    this.setCursor('default')
  })

  this.onHover('clickable', (c) => {
    console.log('onHover', c)
    this.setCursor('pointer')
  })

  this.onHoverEnd('clickable', (c) => {
    console.log('onHoverEnd', c)
    this.setCursor('default')
  })
}
