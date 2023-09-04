import { PrismaCitiesRepository } from '@/repositories/prisma/prisma-cities-repository'
import { FetchCitiesByStateUseCase } from '../fetch-cities-by-state'

export function makeFetchCitiesByStateUseCase() {
  const citiesRepository = new PrismaCitiesRepository()
  const fetchCitiesByStateUseCase = new FetchCitiesByStateUseCase(
    citiesRepository,
  )

  return fetchCitiesByStateUseCase
}
