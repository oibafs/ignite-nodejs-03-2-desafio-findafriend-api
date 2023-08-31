import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { createCity } from './create-city-for-test'

export async function registerOrg() {
  const orgsRepository = new InMemoryOrgsRepository()

  const cityId = await createCity()

  const org = await orgsRepository.create({
    name: 'Fictional Org',
    responsible: 'John Doe',
    email: 'fictional.org@example.com',
    address: 'Somewhere Street 123',
    cep: '12345678',
    city_id: cityId,
    whatsapp: '11912345678',
    password_hash: await hash('123456', 6),
  })

  return org.id
}
