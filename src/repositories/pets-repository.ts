import {
  Age,
  EnergyLevel,
  IndependencyLevel,
  Pet,
  Prisma,
  Size,
  SpaceRequirement,
  Species,
} from '@prisma/client'

export interface FindManyByCityParams {
  cityId: string
  page: number
}

export interface FindManyByCharacteristicsParams {
  cityId: string
  species?: Species[]
  age?: Age
  size?: Size
  energyLevel?: EnergyLevel
  independencyLevel?: IndependencyLevel
  spaceRequirement?: SpaceRequirement
  page: number
}

export interface PetsRepository {
  findManyByCity(params: FindManyByCityParams): Promise<Pet[]>
  findManyByCharacteristics(
    params: FindManyByCharacteristicsParams,
  ): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
