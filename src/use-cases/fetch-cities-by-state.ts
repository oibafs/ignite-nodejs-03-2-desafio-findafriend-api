import { CitiesRepository } from '@/repositories/cities-repository'
import { City, State } from '@prisma/client'

interface FetchCitiesByStateUseCaseRequest {
  state: State
  page: number
}

interface FetchCitiesByStateUseCaseResponse {
  cities: City[]
}

export class FetchCitiesByStateUseCase {
  constructor(private citiesRepository: CitiesRepository) {}

  async execute({
    state,
    page,
  }: FetchCitiesByStateUseCaseRequest): Promise<FetchCitiesByStateUseCaseResponse> {
    const cities = await this.citiesRepository.findByState(state, page)

    return { cities }
  }
}
