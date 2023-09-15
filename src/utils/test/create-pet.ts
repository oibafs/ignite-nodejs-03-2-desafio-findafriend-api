import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { createCity } from './create-city'

export async function createPet() {
  const city = await createCity()

  const org = await prisma.org.create({
    data: {
      name: 'Fictional Org',
      responsible: 'John Doe',
      email: 'fictional.org@example.com',
      address: 'Somewhere Street 123',
      cep: '12345678',
      city_id: city.id,
      whatsapp: '11912345678',
      password_hash: await hash('123456', 6),
    },
  })

  const pet = await prisma.pet.create({
    data: {
      name: 'Alfredo',
      description: 'Cão de guarda',
      species: 'DOG',
      age: 'JUNIOR',
      size: 'SMALL',
      energy_level: 'LOW',
      independency_level: 'HIGH',
      space_requirement: 'LARGE',
      pictures: {
        create: [{ url: 'http://picture.com/123' }],
      },
      requirements: {
        create: [{ description: 'Nenhum' }],
      },
      org_id: org.id,
    },
  })

  return {
    pet,
    city,
  }
}
