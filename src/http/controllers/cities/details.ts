import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetCityDetailsUseCase } from '@/use-cases/factories/make-get-city-details-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const getCityDetailsParamsSchema = z.object({
    city_id: z.string().uuid(),
  })

  const { city_id: cityId } = getCityDetailsParamsSchema.parse(request.params)

  const getCityDetailsUseCase = makeGetCityDetailsUseCase()

  try {
    const { city } = await getCityDetailsUseCase.execute({
      cityId,
    })

    return reply.status(200).send({
      city,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
