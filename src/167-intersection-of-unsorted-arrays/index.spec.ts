import { getIntersection } from '.'

describe('getIntersection', () => {
  it('[1,2,3], [3,2,1]', () => {
    expect.hasAssertions()

    const result = getIntersection([1, 2, 3], [3, 2, 1])

    expect(result).toBeDefined()
    result.sort((a, b) => a - b)
    expect(result).toStrictEqual([1, 2, 3])
  })

  it('[], [3,2,1]', () => {
    expect.hasAssertions()

    const result = getIntersection([], [3, 2, 1])

    expect(result).toStrictEqual([])
  })

  it('[1,100,200,8,8,8,3,6,100,10,10], [8,7,7,50,50,1,1,1,1,3,3]', () => {
    expect.hasAssertions()

    const result = getIntersection(
      [1, 100, 200, 8, 8, 8, 3, 6, 100, 10, 10],
      [8, 7, 7, 50, 50, 1, 1, 1, 1, 3, 3],
    )

    expect(result).toBeDefined()
    result.sort((a, b) => a - b)
    expect(result).toStrictEqual([1, 3, 8])
  })

  it('[1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,3,3,3,3,3,,2,2,2,], [2]', () => {
    expect.hasAssertions()

    // prettier-ignore
    const result = getIntersection(
      // disabling because it is part of the test
      // eslint-disable-next-line no-sparse-arrays
      [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 3, 3, 3, 3, 3, 3, , 2, 2, 2],
      [2],
    )

    expect(result).toBeDefined()
    result.sort((a, b) => a - b)
    expect(result).toStrictEqual([2])
  })
})
