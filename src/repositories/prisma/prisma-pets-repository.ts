import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PetsRepository, FindManyByCityParams } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async findManyByCity(params: FindManyByCityParams) {
    const { cityId, page } = params

    const pets = await prisma.pet.findMany({
      where: {
        org: {
          city_id: cityId,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
      include: {
        pictures: true,
        requirements: true,
      },
    })

    return pet
  }
}
