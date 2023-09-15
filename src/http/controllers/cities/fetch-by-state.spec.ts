import { app } from '@/app'
import { createCity } from '@/utils/test/create-city'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('List cities by state (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a list of cities by state', async () => {
    await createCity()

    const response = await request(app.server)
      .get('/cities')
      .query({
        state: 'PE',
      })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.cities).toEqual([
      expect.objectContaining({
        name: 'Recife',
      }),
    ])
  })
})
