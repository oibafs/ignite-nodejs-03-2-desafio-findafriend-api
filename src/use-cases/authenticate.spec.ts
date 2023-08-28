import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { createCity } from './utils/create-city-for-test'

const email = 'fictional.org@example.com'
const password = '123456'
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(async () => {
    const cityId = await createCity()

    const orgsRepository = new InMemoryOrgsRepository()

    await orgsRepository.create({
      name: 'Fictional Org',
      responsible: 'John Doe',
      email,
      address: 'Somewhere Street 123',
      cep: '12345678',
      city_id: cityId,
      whatsapp: '11912345678',
      password_hash: await hash(password, 6),
    })

    sut = new AuthenticateUseCase(orgsRepository)
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
