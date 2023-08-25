import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCitiesRepository } from '@/repositories/in-memory/in-memory-cities-repository'
import { CreateCityUseCase } from './create-city'
import { CityAlreadyExistsError } from './errors/city-already-exists-error'

let citiesRepository: InMemoryCitiesRepository
let sut: CreateCityUseCase

describe('Create city Use Case', () => {
  beforeEach(() => {
    citiesRepository = new InMemoryCitiesRepository()
    sut = new CreateCityUseCase(citiesRepository)
  })

  it('should be able to create a city', async () => {
    const { city } = await sut.execute({
      name: 'Recife',
      state: 'PE',
    })

    expect(city.id).toEqual(expect.any(String))
  })

  it('should not be able to create the same city twice', async () => {
    const name = 'Recife'
    const state = 'PE'

    await sut.execute({
      name,
      state,
    })

    await expect(() =>
      sut.execute({
        name,
        state,
      }),
    ).rejects.toBeInstanceOf(CityAlreadyExistsError)
  })
})
