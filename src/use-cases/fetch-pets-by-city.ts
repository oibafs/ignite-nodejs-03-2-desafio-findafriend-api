import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FetchPetsByCityUseCaseRequest {
  city: string
  page: number
}

interface FetchPetsByCityUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    page,
  }: FetchPetsByCityUseCaseRequest): Promise<FetchPetsByCityUseCaseResponse> {
    const pets = await this.petsRepository.findManyByCity({
      city,
      page,
    })

    return { pets }
  }
}
