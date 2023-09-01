import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { registerOrg } from './utils/register-org-for-test'

let sut: CreatePetUseCase
let orgId: string

describe('Create Pet Use Case', () => {
  beforeEach(async () => {
    const petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository)

    orgId = await registerOrg()
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
      orgId,
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
