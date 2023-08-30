import { Prisma } from '@prisma/client'
import { prisma } from 'src/lib/prisma'
import { PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetCreateInput) {
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
