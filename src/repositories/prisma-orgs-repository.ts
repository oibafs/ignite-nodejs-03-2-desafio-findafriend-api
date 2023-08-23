import { Prisma } from '@prisma/client'
import { prisma } from 'src/lib/prisma'

export class PrismaOrgsRepository {
  async create(data: Prisma.OrgUncheckedCreateInput) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }
}
