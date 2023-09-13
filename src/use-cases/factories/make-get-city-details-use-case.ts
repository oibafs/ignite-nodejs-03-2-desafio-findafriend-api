import { PrismaCitiesRepository } from '@/repositories/prisma/prisma-cities-repository'
import { GetCityDetailsUseCase } from '../get-city-details'

export function makeGetCityDetailsUseCase() {
  const citiesRepository = new PrismaCitiesRepository()
  const getCityDetailsUseCase = new GetCityDetailsUseCase(citiesRepository)

  return getCityDetailsUseCase
}
