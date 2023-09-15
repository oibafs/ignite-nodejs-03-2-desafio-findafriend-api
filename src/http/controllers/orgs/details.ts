import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetOrgDetailsUseCase } from '@/use-cases/factories/make-get-org-details-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function details(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const getOrgDetailsUseCase = makeGetOrgDetailsUseCase()

  try {
    const { org } = await getOrgDetailsUseCase.execute({
      orgId: request.user.sub,
    })

    return reply.status(200).send({
      org: {
        ...org,
        password_hash: undefined,
      },
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
