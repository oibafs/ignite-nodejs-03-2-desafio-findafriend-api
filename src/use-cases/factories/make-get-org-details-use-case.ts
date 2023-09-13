import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { GetOrgDetailsUseCase } from '../get-org-details'

export function makeGetOrgDetailsUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const getOrgDetailsUseCase = new GetOrgDetailsUseCase(orgsRepository)

  return getOrgDetailsUseCase
}
