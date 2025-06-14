'use client'

import dynamic from 'next/dynamic'

// Dynamic imports für bessere Performance
export const CustomCursor = dynamic(() => import('@/components/CustomCursor'), {
  ssr: false
})

export const FloatingWhatsApp = dynamic(() => import('@/components/FloatingWhatsApp'), {
  ssr: false
}) 