import { Knex } from 'knex'

export default defineEventHandler(async (event) => {

  const app = useNitroApp()
  const db: Knex = app.knex

  const { id } = event.context.params

  const records = await db.select('*')
  .from('connections')
  .where('id', id)
  .limit(1)

  if (records.length !== 1) {
    throw new Error('Not found')
  }

  return records.map(r => ({
    'id': r.id,
    'Provider': r.provider,
    'API Token': r.api_token,
    'Email': r.email,
    'Name': r.name,
    'Enabled': r.enabled,
  }))[0]
})
