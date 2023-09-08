import { PetsRepository } from '@/repositories/pets-repository'
import {
  Age,
  EnergyLevel,
  IndependencyLevel,
  Pet,
  Size,
  SpaceRequirement,
  Species,
} from '@prisma/client'

interface FetchPetsByCharacteristicsUseCaseRequest {
  cityId: string
  species?: Species[]
  age?: Age
  size?: Size
  energyLevel?: EnergyLevel
  independencyLevel?: IndependencyLevel
  spaceRequirement?: SpaceRequirement
  page: number
}

interface FetchPetsByCharacteristicsUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsByCharacteristicsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    cityId,
    species,
    age,
    size,
    energyLevel,
    independencyLevel,
    spaceRequirement,
    page,
  }: FetchPetsByCharacteristicsUseCaseRequest): Promise<FetchPetsByCharacteristicsUseCaseResponse> {
    const pets = await this.petsRepository.findManyByCharacteristics({
      cityId,
      species,
      age,
      size,
      energyLevel,
      independencyLevel,
      spaceRequirement,
      page,
    })

    return { pets }
  }
}
