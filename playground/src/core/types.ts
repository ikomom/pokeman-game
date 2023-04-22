import type { Vec2 } from 'kaboom'

export interface WorldState {
  enemyName: string
  faintedMons: string[]
  playerPos: Vec2
}
