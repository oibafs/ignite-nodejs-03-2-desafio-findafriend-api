import { prisma } from 'src/lib/prisma'
import { hash } from 'bcryptjs'
import { OrgsRepository } from 'src/repositories/orgs-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { Org } from '@prisma/client'

interface RegisterOrgUseCaseRequest {
  name: string
  responsible: string
  email: string
  address: string
  cep: string
  cityId: string
  whatsapp: string
  password: string
}

interface RegisterOrgUseCaseResponse {
  org: Org
}

export class RegisterOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    responsible,
    email,
    address,
    cep,
    cityId,
    whatsapp,
    password,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const orgWithSameEmail = await prisma.org.findUnique({
      where: {
        email,
      },
    })

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const passwordHash = await hash(password, 6)

    const org = await this.orgsRepository.create({
      name,
      responsible,
      email,
      address,
      cep,
      city_id: cityId,
      whatsapp,
      password_hash: passwordHash,
    })

    return { org }
  }
}
