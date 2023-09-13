import { PrismaCitiesRepository } from '@/repositories/prisma/prisma-cities-repository'
import { FetchStatesWithCitiesAvailableUseCase } from '../fetch-states-with-cities-available'

export function makeFetchStatesWithCitiesAvailableUseCase() {
  const citiesRepository = new PrismaCitiesRepository()
  const fetchStatesWithCitiesAvailableUseCase =
    new FetchStatesWithCitiesAvailableUseCase(citiesRepository)

  return fetchStatesWithCitiesAvailableUseCase
}
