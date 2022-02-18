import { stringify } from '.'

describe('stringify', () => {
  it('123', () => {
    expect.hasAssertions()

    expect(stringify(123)).toStrictEqual(JSON.stringify(123))
  })

  it("'string'", () => {
    expect.hasAssertions()

    expect(stringify('string')).toStrictEqual(JSON.stringify('string'))
  })

  it('true', () => {
    expect.hasAssertions()

    expect(stringify(true)).toStrictEqual(JSON.stringify(true))
  })

  it('boolean(false)', () => {
    expect.hasAssertions()

    expect(stringify(Boolean(false))).toStrictEqual(
      JSON.stringify(Boolean(false)),
    )
  })

  it('number(1)', () => {
    expect.hasAssertions()

    expect(stringify(Number(1))).toStrictEqual(JSON.stringify(Number(1)))
  })

  it("string('12')", () => {
    expect.hasAssertions()

    expect(stringify(String('12'))).toStrictEqual(JSON.stringify(String('12')))
  })

  it("[1, 'string', {a: 3}]", () => {
    expect.hasAssertions()

    expect(stringify([1, 'string', { a: 3 }])).toStrictEqual(
      JSON.stringify([1, 'string', { a: 3 }]),
    )
  })

  it('[NaN, null, undefined, Infinity]', () => {
    expect.hasAssertions()

    expect(stringify([NaN, null, undefined, Infinity])).toStrictEqual(
      JSON.stringify([NaN, null, undefined, Infinity]),
    )
  })

  it('new Date()', () => {
    expect.hasAssertions()

    const date = new Date()

    expect(stringify(date)).toStrictEqual(JSON.stringify(date))
  })

  it('non-number key of Array is not enumerable', () => {
    expect.hasAssertions()

    const arr = [1, 2, 3]

    arr['key'] = 'value'

    expect(stringify(arr)).toStrictEqual(JSON.stringify(arr))
  })

  it('{a: undefined, b: null, c: NaN, d: Infinity}', () => {
    expect.hasAssertions()

    const obj = { a: undefined, b: null, c: NaN }

    expect(stringify(obj)).toStrictEqual(JSON.stringify(obj))
  })

  it('symbol-keyed property', () => {
    expect.hasAssertions()

    const obj = { [Symbol()]: 'value' }

    expect(stringify(obj)).toStrictEqual(JSON.stringify(obj))
  })

  it('symbol in array', () => {
    expect.hasAssertions()

    const arr = [Symbol('key')]

    expect(stringify(arr)).toStrictEqual(JSON.stringify(arr))
  })

  it('function', () => {
    expect.hasAssertions()

    const func = () => {
      return
    }

    expect(stringify(func)).toStrictEqual(JSON.stringify(func))
  })

  it('bigint should lead to error', () => {
    expect.hasAssertions()

    const num = 123n

    expect(() => stringify(num)).toThrow('BigInt is not stringifiable.')
  })

  it('non-enumerable properties should be ignored', () => {
    expect.hasAssertions()

    const obj = Object.create(null, {
      a: {
        value: 'a',
        enumerable: false,
      },
      b: {
        value: 'b',
        enumerable: true,
      },
    })

    expect(stringify(obj)).toStrictEqual(JSON.stringify(obj))
  })

  it('circular object should lead to error', () => {
    expect.hasAssertions()

    // disabling to use the same test as bigfrontend
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obj: any = {
      a: 'a',
      b: {},
    }

    obj.b.c = obj

    expect(() => stringify(obj)).toThrow('Maximum call stack size exceeded')
  })

  it('circular array should lead to error', () => {
    expect.hasAssertions()

    // disabling to use the same test as bigfrontend
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const arr: any = [
      1,
      2,
      {
        a: 'a',
        b: {},
      },
      3,
      4,
    ]

    arr[2].b = arr

    expect(() => stringify(arr)).toThrow('Maximum call stack size exceeded')
  })

  it('new Map() with enumerable keys', () => {
    expect.hasAssertions()

    // disabling to use the same test as bigfrontend
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const map: any = new Map()

    map.a = 'a'
    map.b = 'b'

    expect(stringify(map)).toStrictEqual(JSON.stringify(map))
  })

  it('property in prototype should be ignored', () => {
    expect.hasAssertions()

    const a = {
      a: 'a',
      b: 'b',
    }
    const b = Object.create(a)

    b.c = 'c'

    expect(stringify(b)).toStrictEqual(JSON.stringify(b))
  })

  it("emoji {a:'✌️'}", () => {
    expect.hasAssertions()

    const a = { a: '✌️' }

    expect(stringify(a)).toStrictEqual(JSON.stringify(a))
  })
})
