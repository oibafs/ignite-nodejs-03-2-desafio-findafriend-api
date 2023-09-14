import { InMemoryCitiesRepository } from '@/repositories/in-memory/in-memory-cities-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetPetDetailsUseCase } from './get-pet-details'

let petsRepository: InMemoryPetsRepository
let sut: GetPetDetailsUseCase

describe('Get Pet Details Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetDetailsUseCase(petsRepository)
  })

  it('should be able to get pet details', async () => {
    const citiesRepository = new InMemoryCitiesRepository()
    const city = await citiesRepository.create({
      name: 'Recife',
      state: 'PE',
    })

    const orgsRepository = new InMemoryOrgsRepository()
    orgsRepository.cities = citiesRepository.items
    const org = await orgsRepository.create({
      name: 'Fictional Org',
      responsible: 'John Doe',
      email: 'fictional.org@example.com',
      address: 'Somewhere Street 123',
      cep: '12345678',
      city_id: city.id,
      whatsapp: '11912345678',
      password_hash: await hash('123456', 6),
    })
    petsRepository.orgs = orgsRepository.items

    const newPet = await petsRepository.create({
      name: 'Alfredo',
      description: 'Cão de guarda',
      species: 'DOG',
      age: 'JUNIOR',
      size: 'SMALL',
      energy_level: 'LOW',
      independency_level: 'HIGH',
      space_requirement: 'LARGE',
      pictures: {
        create: [{ url: 'http://picture.com/123' }],
      },
      requirements: {
        create: [{ description: 'Nenhum' }],
      },
      org_id: org.id,
    })

    const { pet } = await sut.execute({
      petId: newPet.id,
    })

    expect(pet.name).toEqual('Alfredo')
  })

  it('should not be able to get pet details with wrong id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'random-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
