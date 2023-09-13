import { InMemoryCitiesRepository } from '@/repositories/in-memory/in-memory-cities-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

const email = 'fictional.org@example.com'
const password = '123456'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)

    const citiesRepository = new InMemoryCitiesRepository()
    const city = await citiesRepository.create({
      name: 'Recife',
      state: 'PE',
    })
    orgsRepository.cities = citiesRepository.items

    await orgsRepository.create({
      name: 'Fictional Org',
      responsible: 'John Doe',
      email,
      address: 'Somewhere Street 123',
      cep: '12345678',
      city_id: city.id,
      whatsapp: '11912345678',
      password_hash: await hash(password, 6),
    })
  })

  it('should be able to authenticate', async () => {
    const { org } = await sut.execute({
      email,
      password,
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    expect(() =>
      sut.execute({
        email: 'other.email@example.com',
        password,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    expect(() =>
      sut.execute({
        email,
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
