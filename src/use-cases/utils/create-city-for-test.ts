import { InMemoryCitiesRepository } from '@/repositories/in-memory/in-memory-cities-repository'
import { CreateCityUseCase } from '../create-city'

export async function createCity() {
  const citiesRepository = new InMemoryCitiesRepository()
  const createCityUseCase = new CreateCityUseCase(citiesRepository)

  const { city } = await createCityUseCase.execute({
    name: 'Recife',
    state: 'PE',
  })

  return city.id
}
