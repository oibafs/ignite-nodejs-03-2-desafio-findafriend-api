import { InMemoryCitiesRepository } from '@/repositories/in-memory/in-memory-cities-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetCityDetailsUseCase } from './get-city-details'

let citiesRepository: InMemoryCitiesRepository
let sut: GetCityDetailsUseCase

describe('Get City Details Use Case', () => {
  beforeEach(() => {
    citiesRepository = new InMemoryCitiesRepository()
    sut = new GetCityDetailsUseCase(citiesRepository)
  })

  it('should be able to get city details', async () => {
    const newCity = await citiesRepository.create({
      name: 'Recife',
      state: 'PE',
    })

    const { city } = await sut.execute({
      cityId: newCity.id,
    })

    expect(city.name).toEqual('Recife')
  })

  it('should not be able to get city details with wrong id', async () => {
    await expect(() =>
      sut.execute({
        cityId: 'random-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
