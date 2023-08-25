import { City, State } from '@prisma/client'
import { CitiesRepository } from '@/repositories/cities-repository'
import { CityAlreadyExistsError } from './errors/city-already-exists-error'

interface CreateCityUseCaseRequest {
  name: string
  state: State
}

interface CreateCityUseCaseResponse {
  city: City
}

export class CreateCityUseCase {
  constructor(private citiesRepository: CitiesRepository) {}

  async execute({
    name,
    state,
  }: CreateCityUseCaseRequest): Promise<CreateCityUseCaseResponse> {
    const cityWithSameName = await this.citiesRepository.findByNameAndState({
      name,
      state,
    })

    if (cityWithSameName) {
      throw new CityAlreadyExistsError()
    }

    const city = await this.citiesRepository.create({
      name,
      state,
    })

    return { city }
  }
}
