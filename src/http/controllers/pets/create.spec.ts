import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create a pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Alfredo',
        description: 'Cão de guarda',
        species: 'DOG',
        age: 'JUNIOR',
        size: 'SMALL',
        energy_level: 'LOW',
        independency_level: 'HIGH',
        space_requirement: 'LARGE',
        pictures: [{ url: 'http://picture.com/123' }],
        requirements: [{ description: 'Nenhum' }],
      })

    expect(response.statusCode).toEqual(201)
  })
})
