import type { KaboomOpt } from 'kaboom'
import kaboom from 'kaboom'

export function createInstance(options?: KaboomOpt) {
  return kaboom({
    ...options,
  })
}
