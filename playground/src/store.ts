import type { TextureAtlas } from 'melonjs'

export interface StoreInterface {
  texture: TextureAtlas | null
}
export const store: StoreInterface = {
  texture: null,
}
