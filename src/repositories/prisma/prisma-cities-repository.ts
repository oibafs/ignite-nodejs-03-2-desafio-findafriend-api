import { Prisma } from '@prisma/client'
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

  async create(data: Prisma.CityCreateInput) {
    const city = await prisma.city.create({
      data,
    })

    return city
  }
}
