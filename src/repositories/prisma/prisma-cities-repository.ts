import { Prisma, State } from '@prisma/client'
import { prisma } from 'src/lib/prisma'
import { CitiesRepository, CityData } from '../cities-repository'

export class PrismaCitiesRepository implements CitiesRepository {
  async findByNameAndState(data: CityData) {
    const { name, state } = data

    const cities = await prisma.city.findMany({
      where: {
        name,
        state,
      },
    })

    if (cities.length === 0) {
      return null
    }

    return cities
  }

  async findStatesWithCitiesAvailable() {
    const statesData = await prisma.city.findMany({
      select: {
        state: true,
      },
      distinct: ['state'],
      orderBy: {
        state: 'asc',
      },
    })

    const states = [...new Set(statesData.map((item) => item.state))]

    return states
  }

  async findByState(state: State, page: number) {
    const cities = await prisma.city.findMany({
      where: {
        state,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return cities
  }

  async create(data: Prisma.CityCreateInput) {
    const city = await prisma.city.create({
      data,
    })

    return city
  }
}
