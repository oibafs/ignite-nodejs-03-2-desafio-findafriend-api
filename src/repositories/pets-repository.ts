import { Pet, Prisma } from '@prisma/client'

export interface FindManyByCityParams {
  cityId: string
  page: number
}

export interface PetsRepository {
  findManyByCity(params: FindManyByCityParams): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
