import { Prisma, City, State } from '@prisma/client'

export interface CityData {
  name: string
  state: State
}

export interface CitiesRepository {
  findByNameAndState(data: CityData): Promise<City[] | null>
  create(data: Prisma.CityCreateInput): Promise<City>
}
