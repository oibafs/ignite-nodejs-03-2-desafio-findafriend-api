import { InMemoryCitiesRepository } from '@/repositories/in-memory/in-memory-cities-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { City } from '@prisma/client'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { RegisterOrgUseCase } from './register-org'
import { InvalidCityError } from './errors/invalid-city-error'

let city: City
let orgsRepository: InMemoryOrgsRepository
let sut: RegisterOrgUseCase

describe('Register Org Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterOrgUseCase(orgsRepository)

    const citiesRepository = new InMemoryCitiesRepository()
    city = await citiesRepository.create({
      name: 'Recife',
      state: 'PE',
    })
    orgsRepository.cities = citiesRepository.items
  })

  it('should be able to register an org', async () => {
    const { org } = await sut.execute({
      name: 'Fictional Org',
      responsible: 'John Doe',
      email: 'fictional.org@example.com',
      address: 'Somewhere Street 123',
      cep: '12345678',
      cityId: city.id,
      whatsapp: '11912345678',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash org password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'Fictional Org',
      responsible: 'John Doe',
      email: 'fictional.org@example.com',
      address: 'Somewhere Street 123',
      cep: '12345678',
      cityId: city.id,
      whatsapp: '11912345678',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register an org with same email twice', async () => {
    const email = 'fictional.org@example.com'

    await sut.execute({
      name: 'Fictional Org',
      responsible: 'John Doe',
      email,
      address: 'Somewhere Street 123',
      cep: '12345678',
      cityId: city.id,
      whatsapp: '11912345678',
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'Fictional Org',
        responsible: 'John Doe',
        email,
        address: 'Somewhere Street 123',
        cep: '12345678',
        cityId: city.id,
        whatsapp: '11912345678',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })

  it('should not be able to register an org with an invalid city id', async () => {
    await expect(() =>
      sut.execute({
        name: 'Fictional Org',
        responsible: 'John Doe',
        email: 'fictional.org@example.com',
        address: 'Somewhere Street 123',
        cep: '12345678',
        cityId: 'random-id',
        whatsapp: '11912345678',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCityError)
  })
})
