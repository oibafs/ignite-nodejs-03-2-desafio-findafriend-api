import { InMemoryCitiesRepository } from '@/repositories/in-memory/in-memory-cities-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchCitiesByStateUseCase } from './fetch-cities-by-state'

let citiesRepository: InMemoryCitiesRepository
let sut: FetchCitiesByStateUseCase

describe('Fetch Cities By State', () => {
  beforeEach(() => {
    citiesRepository = new InMemoryCitiesRepository()
    sut = new FetchCitiesByStateUseCase(citiesRepository)
  })

  it('should be able to fetch cities by state', async () => {
    await citiesRepository.create({
      name: 'Recife',
      state: 'PE',
    })

    await citiesRepository.create({
      name: 'Petrolina',
      state: 'PE',
    })

    const { cities } = await sut.execute({
      state: 'PE',
      page: 1,
    })

    expect(cities).toHaveLength(2)
    expect(cities).toEqual([
      expect.objectContaining({ name: 'Recife' }),
      expect.objectContaining({ name: 'Petrolina' }),
    ])
  })

  it('should be able to fetch paginated cities by state', async () => {
    for (let i = 1; i <= 22; i++) {
      await citiesRepository.create({
        name: `City ${i}`,
        state: 'PE',
      })
    }

    const { cities } = await sut.execute({
      state: 'PE',
      page: 2,
    })

    expect(cities).toHaveLength(2)
    expect(cities).toEqual([
      expect.objectContaining({ name: 'City 21' }),
      expect.objectContaining({ name: 'City 22' }),
    ])
  })
})
