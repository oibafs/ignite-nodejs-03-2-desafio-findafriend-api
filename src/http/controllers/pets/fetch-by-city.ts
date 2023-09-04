import { makeFetchPetsByCityUseCase } from '@/use-cases/factories/make-fetch-pets-by-city'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function petsByCity(request: FastifyRequest, reply: FastifyReply) {
  const petsByCityQuerySchema = z.object({
    city: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { city, page } = petsByCityQuerySchema.parse(request.query)

  const fetchPetsByCityUseCase = makeFetchPetsByCityUseCase()

  const { pets } = await fetchPetsByCityUseCase.execute({
    city,
    page,
  })

  return reply.status(200).send({
    pets,
  })
}
