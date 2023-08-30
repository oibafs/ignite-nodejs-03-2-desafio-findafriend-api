import {
  Age,
  EnergyLevel,
  IndependencyLevel,
  Pet,
  Prisma,
  Size,
  SpaceRequirement,
} from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface CreatePetUseCaseRequest {
  name: string
  description: string
  age: Age
  size: Size
  energyLevel: EnergyLevel
  independencyLevel: IndependencyLevel
  spaceRequirement: SpaceRequirement
  pictures: Prisma.PictureCreateNestedManyWithoutPetInput
  requirements: Prisma.RequirementCreateNestedManyWithoutPetInput
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    description,
    age,
    size,
    energyLevel,
    independencyLevel,
    spaceRequirement,
    pictures,
    requirements,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      description,
      age,
      size,
      energy_level: energyLevel,
      independency_level: independencyLevel,
      space_requirement: spaceRequirement,
      pictures,
      requirements,
    })

    return { pet }
  }
}
