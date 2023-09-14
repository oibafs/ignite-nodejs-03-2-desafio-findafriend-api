import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create city (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a city', async () => {
    const response = await request(app.server).post('/cities').send({
      name: 'Recife',
      state: 'PE',
    })

    expect(response.statusCode).toEqual(201)
  })
})
