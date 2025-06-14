'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Scissors, 
  Users, 
  Clock, 
  Settings,
  LogOut,
  Plus,
  Edit,
  Trash
} from 'lucide-react'

interface Service {
  id: number
  name: string
  price: number
  duration: number
  isActive: boolean
}

interface Barber {
  id: number
  name: string
  title: string
  isActive: boolean
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('services')
  const router = useRouter()

  // Beispiel-Daten (später durch API-Aufrufe ersetzen)
  const services: Service[] = [
    { id: 1, name: 'Herrenhaarschnitt', price: 25, duration: 30, isActive: true },
    { id: 2, name: 'Bartpflege', price: 15, duration: 20, isActive: true },
    { id: 3, name: 'Rasur', price: 20, duration: 25, isActive: true },
  ]

  const barbers: Barber[] = [
    { id: 1, name: 'Max Mustermann', title: 'Senior Barber', isActive: true },
    { id: 2, name: 'Tom Schmidt', title: 'Barber', isActive: true },
    { id: 3, name: 'Paul Weber', title: 'Junior Barber', isActive: true },
  ]

  const handleLogout = () => {
    // Hier später: Logout-Logik implementieren
    router.push('/admin/login')
  }

  return (
    <main className="min-h-screen bg-cream-white">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="btn bg-red-500 text-white hover:bg-red-600"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Abmelden
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="card p-4">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('services')}
                  className={`w-full flex items-center gap-2 p-3 rounded-lg transition-colors ${
                    activeTab === 'services'
                      ? 'bg-barbershop-gold text-pure-white'
                      : 'hover:bg-light-cream'
                  }`}
                >
                  <Scissors className="w-5 h-5" />
                  Services
                </button>
                <button
                  onClick={() => setActiveTab('barbers')}
                  className={`w-full flex items-center gap-2 p-3 rounded-lg transition-colors ${
                    activeTab === 'barbers'
                      ? 'bg-barbershop-gold text-pure-white'
                      : 'hover:bg-light-cream'
                  }`}
                >
                  <Users className="w-5 h-5" />
                  Team
                </button>
                <button
                  onClick={() => setActiveTab('hours')}
                  className={`w-full flex items-center gap-2 p-3 rounded-lg transition-colors ${
                    activeTab === 'hours'
                      ? 'bg-barbershop-gold text-pure-white'
                      : 'hover:bg-light-cream'
                  }`}
                >
                  <Clock className="w-5 h-5" />
                  Öffnungszeiten
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-2 p-3 rounded-lg transition-colors ${
                    activeTab === 'settings'
                      ? 'bg-barbershop-gold text-pure-white'
                      : 'hover:bg-light-cream'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  Einstellungen
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            <div className="card p-6">
              {activeTab === 'services' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Services verwalten</h2>
                    <button className="btn btn-primary">
                      <Plus className="w-5 h-5 mr-2" />
                      Neuer Service
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-4">Name</th>
                          <th className="text-left p-4">Preis</th>
                          <th className="text-left p-4">Dauer</th>
                          <th className="text-left p-4">Status</th>
                          <th className="text-left p-4">Aktionen</th>
                        </tr>
                      </thead>
                      <tbody>
                        {services.map((service) => (
                          <tr key={service.id} className="border-b">
                            <td className="p-4">{service.name}</td>
                            <td className="p-4">{service.price}€</td>
                            <td className="p-4">{service.duration} min</td>
                            <td className="p-4">
                              <span
                                className={`px-2 py-1 rounded-full text-sm ${
                                  service.isActive
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {service.isActive ? 'Aktiv' : 'Inaktiv'}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="flex gap-2">
                                <button className="text-barbershop-gold hover:text-gold-dark">
                                  <Edit className="w-5 h-5" />
                                </button>
                                <button className="text-red-500 hover:text-red-600">
                                  <Trash className="w-5 h-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'barbers' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Team verwalten</h2>
                    <button className="btn btn-primary">
                      <Plus className="w-5 h-5 mr-2" />
                      Neues Teammitglied
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-4">Name</th>
                          <th className="text-left p-4">Position</th>
                          <th className="text-left p-4">Status</th>
                          <th className="text-left p-4">Aktionen</th>
                        </tr>
                      </thead>
                      <tbody>
                        {barbers.map((barber) => (
                          <tr key={barber.id} className="border-b">
                            <td className="p-4">{barber.name}</td>
                            <td className="p-4">{barber.title}</td>
                            <td className="p-4">
                              <span
                                className={`px-2 py-1 rounded-full text-sm ${
                                  barber.isActive
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {barber.isActive ? 'Aktiv' : 'Inaktiv'}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="flex gap-2">
                                <button className="text-barbershop-gold hover:text-gold-dark">
                                  <Edit className="w-5 h-5" />
                                </button>
                                <button className="text-red-500 hover:text-red-600">
                                  <Trash className="w-5 h-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'hours' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Öffnungszeiten verwalten</h2>
                  <div className="space-y-4">
                    {['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'].map((day) => (
                      <div key={day} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="w-32 font-medium">{day}</div>
                        <input
                          type="time"
                          className="input w-32"
                          defaultValue="09:00"
                        />
                        <span>bis</span>
                        <input
                          type="time"
                          className="input w-32"
                          defaultValue="19:00"
                        />
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="form-checkbox" defaultChecked />
                          <span>Geöffnet</span>
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <button className="btn btn-primary">Öffnungszeiten speichern</button>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Einstellungen</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-4">Profil</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="label">Name</label>
                          <input type="text" className="input" defaultValue="Admin" />
                        </div>
                        <div>
                          <label className="label">E-Mail</label>
                          <input type="email" className="input" defaultValue="admin@classman.at" />
                        </div>
                        <div>
                          <label className="label">Neues Passwort</label>
                          <input type="password" className="input" placeholder="••••••••" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-4">Allgemein</h3>
                      <div className="space-y-4">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="form-checkbox" defaultChecked />
                          <span>E-Mail-Benachrichtigungen aktivieren</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="form-checkbox" defaultChecked />
                          <span>Automatische Backups aktivieren</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <button className="btn btn-primary">Einstellungen speichern</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 