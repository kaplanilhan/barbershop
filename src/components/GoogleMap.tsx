'use client'

import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps'
import { siteConfig } from '@/config/site'

interface GoogleMapProps {
  className?: string
  height?: string
}

export default function GoogleMap({ className, height = "400px" }: GoogleMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  
  // Fallback to iframe if no API key is provided
  if (!apiKey) {
    return (
      <div className={className} style={{ height }}>
        <iframe
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2658.4097483055!2d${siteConfig.contact.coordinates.lng}!3d${siteConfig.contact.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2zNDfCsDQ4JzQ3LjEiTiAxNsKwMTQnMzUuNSJF!5e0!3m2!1sde!2sat!4v1647881234567!5m2!1sde!2sat`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-xl"
          title={`Karte von ${siteConfig.name}`}
        />
      </div>
    )
  }

  return (
    <div className={className} style={{ height }}>
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={siteConfig.contact.coordinates}
          defaultZoom={16}
          mapId="barbershop-map"
          gestureHandling="cooperative"
        >
          <Marker
            position={siteConfig.contact.coordinates}
            title={siteConfig.name}
          />
        </Map>
      </APIProvider>
    </div>
  )
} 