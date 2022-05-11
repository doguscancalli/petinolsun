import { NextResponse } from 'next/server'
import { verify } from 'jsonwebtoken'

export default function middleware(req) {
  const { cookies, url } = req
  const { token } = cookies
  const domain = req.nextUrl.clone()

  const authRoutes = ['/ilan/yeni']

  if (authRoutes.some((r) => url.includes(r))) {
    if (!token) {
      domain.pathname = '/giris'
      return NextResponse.redirect(domain)
    }
    try {
      verify(token, process.env.JWT_SECRET)
      return NextResponse.next()
    } catch (e) {
      domain.pathname = '/giris'
      return NextResponse.redirect(domain)
    }
  }
  return NextResponse.next()
}
