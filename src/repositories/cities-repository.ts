import { Prisma, City, State } from '@prisma/client'

export interface CityData {
  name: string
  state: State
}

export interface CitiesRepository {
  findByNameAndState(data: CityData): Promise<City[] | null>
  findStatesWithCitiesAvailable(): Promise<State[]>
  findByState(state: State, page: number): Promise<City[]>
  create(data: Prisma.CityCreateInput): Promise<City>
}
