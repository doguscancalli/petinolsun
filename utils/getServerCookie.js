export default (context, name) => {
  let cookie = {}
  context.req.headers.cookie.split(';').forEach((el) => {
    let [k, v] = el.split('=')
    cookie[k.trim()] = v
  })
  return cookie[name]
}
