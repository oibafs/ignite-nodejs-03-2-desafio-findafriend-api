import fastify from 'fastify'
import { orgsRoutes } from './http/controllers/orgs/routes'

export const app = fastify()

app.register(orgsRoutes)
