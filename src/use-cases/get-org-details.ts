import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetOrgDetailsUseCaseRequest {
  orgId: string
}

interface GetOrgDetailsUseCaseResponse {
  org: Org
}

export class GetOrgDetailsUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    orgId,
  }: GetOrgDetailsUseCaseRequest): Promise<GetOrgDetailsUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    return { org }
  }
}
