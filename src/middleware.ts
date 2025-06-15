import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Prüfe ob der Pfad mit /admin beginnt
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Hier können Sie Ihre eigene Authentifizierungslogik implementieren
    // Beispiel: Prüfen eines Auth-Tokens
    const authToken = request.cookies.get('auth-token')
    
    if (!authToken) {
      // Wenn kein Token vorhanden ist, zur Login-Seite weiterleiten
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // Optional: Token-Validierung
    // try {
    //   verifyToken(authToken.value)
    // } catch {
    //   return NextResponse.redirect(new URL('/admin/login', request.url))
    // }
  }

  return NextResponse.next()
}

// Konfiguriere die Pfade, für die die Middleware ausgeführt werden soll
export const config = {
  matcher: '/admin/:path*'
} 