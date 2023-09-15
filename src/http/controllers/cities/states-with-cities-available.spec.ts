import { app } from '@/app'
import { createCity } from '@/utils/test/create-city'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('List states with cities available (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a list of states with cities available', async () => {
    await createCity()

    const response = await request(app.server).get('/states').send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.states).toEqual(['PE'])
  })
})
