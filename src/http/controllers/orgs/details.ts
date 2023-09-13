import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetOrgDetailsUseCase } from '@/use-cases/factories/make-get-org-details-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const getOrgDetailsParamsSchema = z.object({
    org_id: z.string().uuid(),
  })

  const { org_id: orgId } = getOrgDetailsParamsSchema.parse(request.params)

  const getOrgDetailsUseCase = makeGetOrgDetailsUseCase()

  try {
    const { org } = await getOrgDetailsUseCase.execute({
      orgId,
    })

    return reply.status(200).send({
      org,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
