import { InMemoryCitiesRepository } from '@/repositories/in-memory/in-memory-cities-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { City, Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchPetsByCharacteristicsUseCase } from './fetch-pets-by-characteristics'

let city1: City
let org1: Org
let org2: Org
let petsRepository: InMemoryPetsRepository
let sut: FetchPetsByCharacteristicsUseCase

describe('Fetch Pets By Characteristics', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsByCharacteristicsUseCase(petsRepository)

    const citiesRepository = new InMemoryCitiesRepository()
    city1 = await citiesRepository.create({
      name: 'Recife',
      state: 'PE',
    })
    const city2 = await citiesRepository.create({
      name: 'Petrolina',
      state: 'PE',
    })
    petsRepository.cities = citiesRepository.items

    const orgsRepository = new InMemoryOrgsRepository()
    org1 = await orgsRepository.create({
      name: 'Fictional Org',
      responsible: 'John Doe',
      email: 'fictional.org@example.com',
      address: 'Somewhere Street 123',
      cep: '12345678',
      city_id: city1.id,
      whatsapp: '11912345678',
      password_hash: await hash('123456', 6),
    })
    org2 = await orgsRepository.create({
      name: 'Fictional Org 2',
      responsible: 'John Doe',
      email: 'fictional.org2@example.com',
      address: 'Somewhere Street 123',
      cep: '12345678',
      city_id: city2.id,
      whatsapp: '11912345678',
      password_hash: await hash('123456', 6),
    })
    petsRepository.orgs = orgsRepository.items
  })

  it('should be able to fetch pets by city', async () => {
    await petsRepository.create({
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
      org_id: org1.id,
    })

    await petsRepository.create({
      name: 'Juscelino',
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
      org_id: org2.id,
    })

    const { pets } = await sut.execute({
      cityId: city1.id,
      page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Alfredo' })])
  })

  it('should be able to fetch pets by all characteristics', async () => {
    await petsRepository.create({
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
      org_id: org1.id,
    })

    await petsRepository.create({
      name: 'Juscelino',
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
      org_id: org2.id,
    })

    await petsRepository.create({
      name: 'Getúlio',
      description: 'Cão de guarda',
      species: 'DOG',
      age: 'JUNIOR',
      size: 'SMALL',
      energy_level: 'HIGH',
      independency_level: 'HIGH',
      space_requirement: 'LARGE',
      pictures: {
        create: [{ url: 'http://picture.com/123' }],
      },
      requirements: {
        create: [{ description: 'Nenhum' }],
      },
      org_id: org1.id,
    })

    const { pets } = await sut.execute({
      cityId: city1.id,
      species: ['DOG'],
      age: 'JUNIOR',
      size: 'SMALL',
      energyLevel: 'LOW',
      independencyLevel: 'HIGH',
      spaceRequirement: 'LARGE',
      page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Alfredo' })])
  })

  it('should be able to fetch paginated pets by city', async () => {
    for (let i = 1; i <= 22; i++) {
      await petsRepository.create({
        name: `Pet ${i}`,
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
        org_id: org1.id,
      })
    }

    const { pets } = await sut.execute({
      cityId: city1.id,
      page: 2,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Pet 21' }),
      expect.objectContaining({ name: 'Pet 22' }),
    ])
  })
})
