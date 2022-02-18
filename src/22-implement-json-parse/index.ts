export function parse(str: string) {
  const SIMPLE_RETURNS_MAP = {
    '[]': [],
    '{}': {},
    false: false,
    null: null,
    true: true,
  }
  const SIMPLE_RETURNS_KEYS = Object.keys(SIMPLE_RETURNS_MAP)

  if (!str) {
    throw new Error('Invalid input.')
  }

  if (str.includes("'")) {
    throw new Error('Apostrophe is not parsable.')
  }

  if (SIMPLE_RETURNS_KEYS.includes(str)) {
    return SIMPLE_RETURNS_MAP[str]
  }

  if (!isNaN(+str)) {
    return +str
  }

  if (str.startsWith('"') && str.endsWith('"')) {
    return str.slice(1, -1)
  }

  if (str.startsWith('{') && str.endsWith('}')) {
    const pairs = str.slice(1, -1).split(',')

    return pairs.reduce((acc, pair) => {
      const index = pair.indexOf(':')
      const key = pair.slice(0, index)
      const value = pair.slice(index + 1)

      return {
        ...acc,
        [parse(key)]: parse(value),
      }
    }, {})
  }

  if (str.startsWith('[') && str.endsWith(']')) {
    const values = str.slice(1, -1).split(',')

    return values.map((value) => parse(value))
  }

  throw new Error('Invalid input.')
}
