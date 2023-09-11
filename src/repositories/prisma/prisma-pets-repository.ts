import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import {
  PetsRepository,
  FindManyByCityParams,
  FindManyByCharacteristicsParams,
} from '../pets-repository'
import { prismaExclude } from './utils/exclude-fields'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const orgFieldsWithoutPassword = prismaExclude('Org', ['password_hash'])
    const orgFieldsWithoutPasswordWithCity = {
      ...orgFieldsWithoutPassword,
      city: true,
    }

    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
      include: {
        pictures: true,
        requirements: true,
        org: {
          select: orgFieldsWithoutPasswordWithCity,
        },
      },
    })

    return pet
  }

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

  async findManyByCharacteristics(params: FindManyByCharacteristicsParams) {
    const {
      cityId,
      species,
      age,
      size,
      energyLevel,
      independencyLevel,
      spaceRequirement,
      page,
    } = params

    const pets = await prisma.pet.findMany({
      where: {
        org: {
          city_id: cityId,
        },
        species: { in: species },
        age,
        size,
        energy_level: energyLevel,
        independency_level: independencyLevel,
        space_requirement: spaceRequirement,
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
