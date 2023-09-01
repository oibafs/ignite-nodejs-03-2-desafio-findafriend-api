import {
  Age,
  EnergyLevel,
  IndependencyLevel,
  Pet,
  Prisma,
  Size,
  SpaceRequirement,
  Species,
} from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface CreatePetUseCaseRequest {
  name: string
  description: string
  species: Species
  age: Age
  size: Size
  energyLevel: EnergyLevel
  independencyLevel: IndependencyLevel
  spaceRequirement: SpaceRequirement
  pictures: Prisma.PictureCreateNestedManyWithoutPetInput
  requirements: Prisma.RequirementCreateNestedManyWithoutPetInput
  orgId: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    description,
    species,
    age,
    size,
    energyLevel,
    independencyLevel,
    spaceRequirement,
    pictures,
    requirements,
    orgId,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      description,
      species,
      age,
      size,
      energy_level: energyLevel,
      independency_level: independencyLevel,
      space_requirement: spaceRequirement,
      pictures,
      requirements,
      org_id: orgId,
    })

    return { pet }
  }
}
