export default (object) => {
  const arr = Object.keys(object).map((key) => {
    return {
      name: object[key],
      value: key,
    }
  })
  return arr
}
