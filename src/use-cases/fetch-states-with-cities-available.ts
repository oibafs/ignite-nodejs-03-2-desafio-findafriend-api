import { CitiesRepository } from '@/repositories/cities-repository'
import { State } from '@prisma/client'

interface FetchStatesWithCitiesAvailableUseCaseResponse {
  states: State[]
}

export class FetchStatesWithCitiesAvailableUseCase {
  constructor(private citiesRepository: CitiesRepository) {}

  async execute(): Promise<FetchStatesWithCitiesAvailableUseCaseResponse> {
    const states = await this.citiesRepository.findStatesWithCitiesAvailable()

    return { states }
  }
}
