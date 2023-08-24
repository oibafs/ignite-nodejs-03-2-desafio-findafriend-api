import { Prisma, Org } from '@prisma/client'

export interface OrgsRepository {
  findByEmail(email: string): Promise<Org | null>
  create(data: Prisma.OrgUncheckedCreateInput): Promise<Org>
}
