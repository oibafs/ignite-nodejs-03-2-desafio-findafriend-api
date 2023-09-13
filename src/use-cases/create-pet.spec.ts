import { InMemoryCitiesRepository } from '@/repositories/in-memory/in-memory-cities-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from './create-pet'

let org: Org

let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository)

    const citiesRepository = new InMemoryCitiesRepository()
    const city = await citiesRepository.create({
      name: 'Recife',
      state: 'PE',
    })
    petsRepository.cities = citiesRepository.items

    const orgsRepository = new InMemoryOrgsRepository()
    orgsRepository.cities = citiesRepository.items
    org = await orgsRepository.create({
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
  })

  it('should be able to create a pet', async () => {
    const { pet } = await sut.execute({
      name: 'Alfredo',
      description: 'Cão de guarda',
      species: 'DOG',
      age: 'JUNIOR',
      size: 'SMALL',
      energyLevel: 'LOW',
      independencyLevel: 'HIGH',
      spaceRequirement: 'LARGE',
      pictures: {
        create: [{ url: 'http://picture.com/123' }],
      },
      requirements: {
        create: [{ description: 'Nenhum' }],
      },
      orgId: org.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
