import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const orgsRepository = new PrismaOrgsRepository()
    const authenticateUseCase = new AuthenticateUseCase(orgsRepository)

    await authenticateUseCase.execute({
      email,
      password,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send()
}
