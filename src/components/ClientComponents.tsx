'use client'

import dynamic from 'next/dynamic'

export const FloatingWhatsApp = dynamic(() => import('@/components/FloatingWhatsApp'), {
  ssr: false
})
