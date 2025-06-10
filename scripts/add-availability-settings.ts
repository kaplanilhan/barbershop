import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

async function addAvailabilitySettings() {
  console.log('🔧 Füge Availability-Settings hinzu...')

  try {
    // Prüfen ob Settings bereits existieren
    const existingSettings = await prisma.setting.findMany({
      where: {
        key: {
          in: ['slot_interval_minutes', 'buffer_minutes']
        }
      }
    })

    const existingKeys = existingSettings.map(s => s.key)

    const newSettings = []

    if (!existingKeys.includes('slot_interval_minutes')) {
      newSettings.push({
        key: 'slot_interval_minutes',
        value: '30', // Zeitslots alle 30 Minuten
      })
    }

    if (!existingKeys.includes('buffer_minutes')) {
      newSettings.push({
        key: 'buffer_minutes',
        value: '15', // 15 Minuten Puffer zwischen Terminen
      })
    }

    if (newSettings.length > 0) {
      await prisma.setting.createMany({
        data: newSettings,
      })
      console.log(`✅ ${newSettings.length} neue Settings hinzugefügt`)
    } else {
      console.log('ℹ️ Alle Settings bereits vorhanden')
    }

    // Alle Settings anzeigen
    const allSettings = await prisma.setting.findMany({
      orderBy: { key: 'asc' }
    })

    console.log('\n📋 Aktuelle Settings:')
    allSettings.forEach(setting => {
      console.log(`  ${setting.key}: ${setting.value}`)
    })

  } catch (error) {
    console.error('❌ Fehler beim Hinzufügen der Settings:', error)
  } finally {
    await prisma.$disconnect()
  }
}

addAvailabilitySettings() 