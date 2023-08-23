import { prisma } from 'src/lib/prisma'
import { hash } from 'bcryptjs'
import { PrismaOrgsRepository } from 'src/repositories/prisma-orgs-repository'

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

export async function registerOrgUseCase({
  name,
  responsible,
  email,
  address,
  cep,
  cityId,
  whatsapp,
  password,
}: RegisterOrgUseCaseRequest) {
  const orgWithSameEmail = await prisma.org.findUnique({
    where: {
      email,
    },
  })

  if (orgWithSameEmail) {
    throw new Error('E-mail already registered.')
  }

  const passwordHash = await hash(password, 6)

  const prismaOrgsRepository = new PrismaOrgsRepository()

  await prismaOrgsRepository.create({
    name,
    responsible,
    email,
    address,
    cep,
    city_id: cityId,
    whatsapp,
    password_hash: passwordHash,
  })
}
