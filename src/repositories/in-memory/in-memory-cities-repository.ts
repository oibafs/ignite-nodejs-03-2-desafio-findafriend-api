import { City, State, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { CitiesRepository, CityData } from '../cities-repository'

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

  async findStatesWithCitiesAvailable() {
    const states = [...new Set(this.items.map((item) => item.state))]

    return states
  }

  async findByState(state: State, page: number) {
    const cities = this.items
      .filter((item) => item.state === state)
      .slice((page - 1) * 20, page * 20)

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
