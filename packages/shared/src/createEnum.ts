export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never

type CreateEnum<T> = T extends [infer E, infer K]
  ? UnionToIntersection<{
    [key in E & string]: K;
  }>
  : never

type StringOrNum<T> = T extends string
  ? string
  : T extends number
    ? number
    : never

/**
 * 创建枚举
 * createEnum([
 ['ONE', 2, '开始'],
 ['TWO', '3', 2],
 ])
 * @param args
 * @link https://www.typescriptlang.org/play?#code/KYDwDg9gTgLgBDAnmYcCqA7AlhDAVCASQxmCgGdgBjGHDAHjQD44BeOACgCg505RSGACbk4AQwyI4Afk4BrAFzoAlGxYA3CFiFwlGYOrJdVA4MNEdFcLBgBmZOIVWsNWoTxmOPeg2QDcXFxIKHAAwlDAYqQAohgArgC29Hgs7Hj8IIIicADaNvZQcNEANNZ2DgDSpfkOADIAuh6ymHQExKQU1LS49ADeHry8OXLAUjZFcABkcOQwUDYA5vVKFQGDcAC+TN5w+oZQAUHIqADKc4sA8lAAconJqXDppuYz5xgLTa-z7ztPmWbZeIJABGRl4siBoKgOz2-i4tjiGBodDgVAiUWAsTuHgqGSyolm3wWxQ8ADU8QCCW8FnAAD67RJQkm8WrMx4Ul45KpwUmlBokpjcXhiKALchKdFCXAAGykeBy9RJyiUACVIlKMLL6B4Wrg2iQyJRkT1wpEYkD7ixpv11gtgDBLKMlGciVdbkl5QBGepMZWPHIAJnqa0G0qwsyUNvWcHUYmlcWAzupbruXp9IfW0rEoOlSnlQYzmwVIY2XBYUaouFmcAgwIAVmw4Bd610AHRos3ADjxaXS5QhysYasJMRgRv6ADucAAsqP6Ly4LVBf2PIPq2GI3Ao7xY-HEzzC1mc0paiWFY3i4FeLZoJw1-AcsBSnJStL6jXbOJReRVNua-XH3fdg5ELEcwFbSgHRfOA+0PcMYFbMA4nIAALDg-x3OMEyUF8BlDbNgFzGC2V4DYV1IjwIhgOIoAwJsWxoVtbAiYAAC8uz-VsuNrOsSLgO0YCUMDWwEviNxgNkyICUsuHvfiATILEEkbDsMSUjgcg8HIAHILmuaJtNKANSm0wAAfUAac1tMVLTtLwAB1C5DLgbSAGYnKDEl6hXLg7WERSgVbPToiAA
 */
export function createEnum<
  K extends string, V extends string | number, L, T extends [K, V, L],
>(
  args: readonly T[],
): Readonly<
  UnionToIntersection<CreateEnum<T>> & {
    get(key: StringOrNum<T[1]>): T[2]
    list: {
      value: StringOrNum<T[1]>
      label: T[2]
    }[]
  }
> {
  const obj = Object.create(null)
  const map = new Map<V, L>()
  const list: {
    value: V
    label: L
  }[] = []

  for (const [e, k, l] of args) {
    obj[e] = k
    map.set(k, l)
    list.push({
      value: k,
      label: l,
    })
  }
  return Object.freeze({
    ...obj,
    getLabel(value: V) { return map.get(value) },
    list,
  })
}
