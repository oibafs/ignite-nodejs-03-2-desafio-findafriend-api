import { beforeEach, describe, expect, it } from 'vitest'
import { FetchStatesWithCitiesAvailableUseCase } from './fetch-states-with-cities-available'
import { InMemoryCitiesRepository } from '@/repositories/in-memory/in-memory-cities-repository'

let citiesRepository: InMemoryCitiesRepository
let sut: FetchStatesWithCitiesAvailableUseCase

describe('Fetch States With Cities Available Use Case', () => {
  beforeEach(() => {
    citiesRepository = new InMemoryCitiesRepository()
    sut = new FetchStatesWithCitiesAvailableUseCase(citiesRepository)
  })

  it('should be able to fetch states with cities available', async () => {
    await citiesRepository.create({
      name: 'Recife',
      state: 'PE',
    })

    await citiesRepository.create({
      name: 'Goiânia',
      state: 'GO',
    })

    await citiesRepository.create({
      name: 'Petrolina',
      state: 'PE',
    })

    const { states } = await sut.execute()

    expect(states).toHaveLength(2)
    expect(states).toEqual(['GO', 'PE'])
  })
})
