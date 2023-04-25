// a melonJS data manifest
// note : this is note a webpack manifest
const DataManifest = [
  //Bitmap Font
  {
    name: 'PressStart2P',
    type: 'image',
    src: './fnt/PressStart2P.png',
  },
  {
    name: 'PressStart2P',
    type: 'binary',
    src: './fnt/PressStart2P.fnt',
  },
  // audio
  { name: "dst-gameforest",  type: "audio", src: "./bgm/" },

  // images
  { name: "tileset",         type:"image",   src: "./img/tileset.png" },
  { name: "background",      type:"image",   src: "./img/background.png" },
  { name: "clouds",          type:"image",   src: "./img/clouds.png" },

  // tileset
  { name: 'tileset', type: 'tsx', src: './map/tileset.json' },
  // map
  { name: 'map1', type: 'tmx', src: './map/map1.tmx' },
  // texturePacker
  { name: "texture",         type: "json",   src: "./img/texture.json" },
  { name: "texture",         type: "image",  src: "./img/texture.png" },

]
  .map(item => ({
    ...item,
    src: new URL(item.src, import.meta.url).toString(),
  }))

export default DataManifest
