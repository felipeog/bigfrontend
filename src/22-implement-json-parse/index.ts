function splitObjectValues(rawInput: string) {
  const input = rawInput.slice(1, -1)
  const values = []
  let buffer = ''
  let depth = 0
  let isValue = false
  let isQuote = false

  for (let i = 0; i < input.length; i++) {
    const current = input[i]

    if (current === ':') {
      isValue = true
    }

    if (current === '"' && isValue) {
      isQuote = !isQuote
    }

    if (['{', '['].includes(current) && isValue) {
      depth++
    }

    if (['}', ']'].includes(current) && isValue) {
      depth--
    }

    if (current === ',' && depth <= 0 && !isQuote) {
      isValue = false
    }

    if (current === ',' && !isValue) {
      values.push(buffer)
      buffer = ''
      continue
    }

    buffer += current

    if (i + 1 === input.length && buffer) {
      values.push(buffer)
    }
  }

  return values
}

function splitArrayValues(rawInput: string) {
  const input = rawInput.slice(1, -1)
  const values = []
  let buffer = ''
  let depth = 0
  let commaCount = 0

  for (let i = 0; i < input.length; i++) {
    const current = input[i]

    if (['{', '['].includes(current)) {
      depth++
    }

    if (['}', ']'].includes(current)) {
      depth--
    }

    if (current === ',' && depth <= 0) {
      values.push(buffer)
      buffer = ''
      commaCount++
      continue
    }

    buffer += current

    if (i + 1 === input.length && buffer) {
      values.push(buffer)
    }
  }

  if (commaCount >= values.length) {
    throw new Error('Invalid input.')
  }

  return values
}

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
    const pairs = splitObjectValues(str)

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
    const values = splitArrayValues(str)

    return values.map((value) => parse(value))
  }

  throw new Error('Invalid input.')
}
