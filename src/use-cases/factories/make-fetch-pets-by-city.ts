import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsByCityUseCase } from '../fetch-pets-by-city'

export function makeFetchPetsByCityUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const fetchPetsByCityUseCase = new FetchPetsByCityUseCase(petsRepository)

  return fetchPetsByCityUseCase
}
