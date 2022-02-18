export function stringify(data = undefined) {
  if (data === undefined || ['symbol', 'function'].includes(typeof data)) {
    return
  }

  if (typeof data === 'bigint') {
    throw new Error('BigInt is not stringifiable.')
  }

  if (typeof data === 'string') {
    return `"${data}"`
  }

  if (data instanceof Date) {
    return `"${data.toISOString()}"`
  }

  if (typeof data === 'number' && (isNaN(data) || !isFinite(data))) {
    return `null`
  }

  if (Array.isArray(data)) {
    const items = data
      .map((item) => {
        if (['symbol', 'undefined'].includes(typeof item)) {
          return 'null'
        }

        return stringify(item)
      })
      .join(',')

    return `[${items}]`
  }

  if (data !== null && typeof data === 'object') {
    const entries = Object.entries(data)
      .filter(({ 1: value }) => !['symbol', 'undefined'].includes(typeof value))
      .map(([key, value]) => `"${key}":${stringify(value)}`)
      .join(',')

    return `{${entries}}`
  }

  return `${data}`
}
