import { describe, expect, it } from 'vitest'
import { compare } from 'bcryptjs'
import { RegisterOrgUseCase } from './register-org'

describe('Register Org Use Case', () => {
  it('should hash org password upon registration', async () => {
    const registerOrgUseCase = new RegisterOrgUseCase({
      async findByEmail(email) {
        return null
      },

      async create(data) {
        return {
          id: 'org-1',
          name: data.name,
          responsible: data.responsible,
          email: data.email,
          address: data.address,
          cep: data.cep,
          city_id: data.city_id,
          whatsapp: data.whatsapp,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    })

    const { org } = await registerOrgUseCase.execute({
      name: 'Fictional Org',
      responsible: 'John Doe',
      email: 'fictional.org@example.com',
      address: 'Somewhere Street 123',
      cep: '12345678',
      cityId: '6d4d0404-84a4-4213-90bf-36a20993f5fe',
      whatsapp: '11912345678',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
