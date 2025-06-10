'use client'

import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="flex items-center gap-2 px-4 py-2 text-warm-gray hover:text-barbershop-gold transition-colors"
    >
      <LogOut size={20} />
      <span>Abmelden</span>
    </button>
  )
} 