import { app } from '@/app'
import { createPet } from '@/utils/test/create-pet'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('List pets by characteristics (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a list of pets by characteristics', async () => {
    const { city } = await createPet()

    const response = await request(app.server)
      .get('/pets')
      .query({
        city_id: city.id,
      })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'Alfredo',
      }),
    ])
  })
})
