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
    get: map.get,
    list,
  })
}
