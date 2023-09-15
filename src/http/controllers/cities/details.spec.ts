import { app } from '@/app'
import { createCity } from '@/utils/test/create-city'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get city details (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a city details', async () => {
    const city = await createCity()

    const response = await request(app.server).get(`/cities/${city.id}`).send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.city).toEqual(
      expect.objectContaining({
        name: 'Recife',
      }),
    )
  })
})
