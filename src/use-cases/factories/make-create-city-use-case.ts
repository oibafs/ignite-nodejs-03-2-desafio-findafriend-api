import { PrismaCitiesRepository } from '@/repositories/prisma/prisma-cities-repository'
import { CreateCityUseCase } from '../create-city'

export function makeCreateCityUseCase() {
  const citiesRepository = new PrismaCitiesRepository()
  const createCityUseCase = new CreateCityUseCase(citiesRepository)

  return createCityUseCase
}
