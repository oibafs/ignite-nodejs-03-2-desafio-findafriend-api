import { beforeEach, describe, expect, it } from 'vitest'
import { compare } from 'bcryptjs'
import { RegisterOrgUseCase } from './register-org'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryCitiesRepository } from '@/repositories/in-memory/in-memory-cities-repository'
import { CreateCityUseCase } from './create-city'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterOrgUseCase
let cityId: string

async function createCity() {
  const citiesRepository = new InMemoryCitiesRepository()
  const createCityUseCase = new CreateCityUseCase(citiesRepository)

  const { city } = await createCityUseCase.execute({
    name: 'Recife',
    state: 'PE',
  })

  return city.id
}

describe('Register Org Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterOrgUseCase(orgsRepository)

    cityId = await createCity()
  })

  it('should be able to register an org', async () => {
    const { org } = await sut.execute({
      name: 'Fictional Org',
      responsible: 'John Doe',
      email: 'fictional.org@example.com',
      address: 'Somewhere Street 123',
      cep: '12345678',
      cityId,
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
      cityId,
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
      cityId,
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
        cityId,
        whatsapp: '11912345678',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
