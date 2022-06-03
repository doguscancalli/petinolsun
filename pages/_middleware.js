import { NextResponse } from 'next/server'
import jwt from '@tsndr/cloudflare-worker-jwt'

export default async function middleware(req) {
  const { cookies, url } = req
  const { token } = cookies
  const domain = req.nextUrl.clone()

  const authRoutes = ['/ilan/yeni', '/profil']

  if (authRoutes.some((r) => url.includes(r))) {
    if (!token) {
      domain.pathname = '/giris'
      return NextResponse.redirect(domain)
    }
    const isValid = await jwt.verify(token, process.env.JWT_SECRET)
    if (!isValid) {
      domain.pathname = '/giris'
      return NextResponse.redirect(domain)
    }
  }
  return NextResponse.next()
}
