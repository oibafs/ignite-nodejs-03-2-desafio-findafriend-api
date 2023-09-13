import { InMemoryCitiesRepository } from '@/repositories/in-memory/in-memory-cities-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetOrgDetailsUseCase } from './get-org-details'

let orgsRepository: InMemoryOrgsRepository
let sut: GetOrgDetailsUseCase

describe('Get Org Details Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetOrgDetailsUseCase(orgsRepository)
  })

  it('should be able to get org details', async () => {
    const citiesRepository = new InMemoryCitiesRepository()
    const city = await citiesRepository.create({
      name: 'Recife',
      state: 'PE',
    })
    orgsRepository.cities = citiesRepository.items

    const newOrg = await orgsRepository.create({
      name: 'Fictional Org',
      responsible: 'John Doe',
      email: 'fictional.org@example.com',
      address: 'Somewhere Street 123',
      cep: '12345678',
      city_id: city.id,
      whatsapp: '11912345678',
      password_hash: await hash('123456', 6),
    })

    const { org } = await sut.execute({
      orgId: newOrg.id,
    })

    expect(org.name).toEqual('Fictional Org')
  })

  it('should not be able to get org details with wrong id', async () => {
    await expect(() =>
      sut.execute({
        orgId: 'random-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
