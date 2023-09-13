import { CitiesRepository } from '@/repositories/cities-repository'
import { City } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetCityDetailsUseCaseRequest {
  cityId: string
}

interface GetCityDetailsUseCaseResponse {
  city: City
}

export class GetCityDetailsUseCase {
  constructor(private citiesRepository: CitiesRepository) {}

  async execute({
    cityId,
  }: GetCityDetailsUseCaseRequest): Promise<GetCityDetailsUseCaseResponse> {
    const city = await this.citiesRepository.findById(cityId)

    if (!city) {
      throw new ResourceNotFoundError()
    }

    return { city }
  }
}
