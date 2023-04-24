// a melonJS data manifest
// note : this is note a webpack manifest
const DataManifest = [
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
]
  .map(item => ({
    ...item,
    src: new URL(item.src, import.meta.url),
  }))

export default DataManifest
