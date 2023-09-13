import { makeGetPetDetailsUseCase } from '@/use-cases/factories/make-get-pet-details-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const getPetDetailsParamsSchema = z.object({
    pet_id: z.string().uuid(),
  })

  const { pet_id: petId } = getPetDetailsParamsSchema.parse(request.params)

  const getPetDetailsUseCase = makeGetPetDetailsUseCase()

  const { pet } = await getPetDetailsUseCase.execute({
    petId,
  })

  return reply.status(200).send({
    pet,
  })
}
