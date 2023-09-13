import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsByCharacteristicsUseCase } from '../fetch-pets-by-characteristics'

export function makeFetchPetsByCharacteristicsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const fetchPetsByCharacteristicsUseCase =
    new FetchPetsByCharacteristicsUseCase(petsRepository)

  return fetchPetsByCharacteristicsUseCase
}
