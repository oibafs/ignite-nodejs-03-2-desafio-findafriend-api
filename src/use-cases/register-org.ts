import { hash } from 'bcryptjs'
import { OrgsRepository } from 'src/repositories/orgs-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { Org } from '@prisma/client'
import { InvalidCityError } from './errors/invalid-city-error'

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
    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    try {
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
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof error.message === 'string' &&
        error.message.includes(
          'Foreign key constraint failed on the field: `orgs_city_id_fkey (index)`',
        )
      ) {
        throw new InvalidCityError()
      }

      throw error
    }
  }
}
