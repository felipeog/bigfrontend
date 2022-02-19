import { parse } from '.'

describe('parse', () => {
  it('{}', () => {
    expect.hasAssertions()

    expect(parse('{}')).toStrictEqual(JSON.parse('{}'))
  })

  it('{"a":3}', () => {
    expect.hasAssertions()

    expect(parse('{"a":3}')).toStrictEqual(JSON.parse('{"a":3}'))
  })

  it('true', () => {
    expect.hasAssertions()

    expect(parse('true')).toStrictEqual(JSON.parse('true'))
  })

  it('123', () => {
    expect.hasAssertions()

    expect(parse('123')).toStrictEqual(JSON.parse('123'))
  })

  it('"123"', () => {
    expect.hasAssertions()

    expect(parse('"123"')).toStrictEqual(JSON.parse('"123"'))
  })

  it('null', () => {
    expect.hasAssertions()

    expect(parse('null')).toStrictEqual(JSON.parse('null'))
  })

  it('[{"a":{"b":{"c":[1]}}},null,"str"]', () => {
    expect.hasAssertions()

    expect(parse('[{"a":{"b":{"c":[1]}}},null,"str"]')).toStrictEqual(
      JSON.parse('[{"a":{"b":{"c":[1]}}},null,"str"]'),
    )
  })

  it('{"a":"✌️"}', () => {
    expect.hasAssertions()

    expect(parse('{"a":"✌️"}')).toStrictEqual(JSON.parse('{"a":"✌️"}'))
  })

  it('[1,2,]', () => {
    expect.hasAssertions()

    expect(() => parse('[1,2,]')).toThrow('Invalid input.')
  })

  it("{'a':3}", () => {
    expect.hasAssertions()

    expect(() => parse("{'a':3}")).toThrow('Apostrophe is not parsable.')
  })

  it('{"a":}', () => {
    expect.hasAssertions()

    expect(() => parse('{"a":}')).toThrow('Invalid input.')
  })
})

// https://bigfrontend.dev/problem/implement-JSON-parse/discuss/2395
describe('parse: extra tests from the community', () => {
  it('[1,{"a":[1,2,3]}]', () => {
    expect.hasAssertions()

    expect(parse('[1,{"a":[1,2,3]}]')).toStrictEqual(
      JSON.parse('[1,{"a":[1,2,3]}]'),
    )
  })

  it('{"a":"hello,world"}', () => {
    expect.hasAssertions()

    expect(parse('{"a":"hello,world"}')).toStrictEqual(
      JSON.parse('{"a":"hello,world"}'),
    )
  })
})
