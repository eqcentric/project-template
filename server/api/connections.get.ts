import { Knex } from 'knex'

export default defineEventHandler(async (event) => {

  const app = useNitroApp()
  const db: Knex = app.knex
  const records = await db.select('*').from('connections')

  return records.map(r => ({
    'id': r.id,
    'Provider': r.provider,
    'API Token': r.api_token,
    'Email': r.email,
    'Name': r.name,
    'Enabled': r.enabled,
  }))
})
