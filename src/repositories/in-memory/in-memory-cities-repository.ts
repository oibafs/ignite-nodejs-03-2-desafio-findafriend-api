import { Prisma, City } from '@prisma/client'
import { CitiesRepository, CityData } from '../cities-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryCitiesRepository implements CitiesRepository {
  public items: City[] = []

  async findByNameAndState(data: CityData) {
    const { name, state } = data
    const cities = this.items.filter(
      (item) => item.name === name && item.state === state,
    )

    if (cities.length === 0) {
      return null
    }

    return cities
  }

  async create(data: Prisma.CityCreateInput) {
    const city = {
      id: randomUUID(),
      name: data.name,
      state: data.state,
    }

    this.items.push(city)

    return city
  }
}
