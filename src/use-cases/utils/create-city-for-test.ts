import { InMemoryCitiesRepository } from '@/repositories/in-memory/in-memory-cities-repository'

export async function createCity() {
  const citiesRepository = new InMemoryCitiesRepository()

  const city = await citiesRepository.create({
    name: 'Recife',
    state: 'PE',
  })

  return city.id
}
