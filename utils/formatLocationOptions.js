export default (data) => {
  return data.map((item) => ({
    label: item,
    name: item,
    value: item,
  }))
}
