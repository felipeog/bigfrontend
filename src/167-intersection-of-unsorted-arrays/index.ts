export function getIntersection(arr1 = [], arr2 = []) {
  const items = arr1.filter((item) => {
    return arr2.includes(item)
  })

  return [...new Set(items)]
}
