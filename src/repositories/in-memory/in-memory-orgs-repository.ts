import { Org, City, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { OrgsRepository } from '../orgs-repository'
import { InvalidCityError } from '@/use-cases/errors/invalid-city-error'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []
  public cities: City[] = []

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async create(data: Prisma.OrgUncheckedCreateInput) {
    const city = this.cities.find((item) => item.id === data.city_id)

    if (!city) {
      throw new InvalidCityError()
    }

    const org = {
      id: randomUUID(),
      name: data.name,
      responsible: data.responsible,
      email: data.email,
      address: data.address,
      cep: data.cep,
      city_id: data.city_id,
      whatsapp: data.whatsapp,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(org)

    return org
  }
}
