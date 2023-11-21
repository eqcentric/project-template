import { Knex } from 'knex'

export default defineEventHandler(async (event) => {

  const app = useNitroApp()
  const db: Knex = app.knex

  const id = getRouterParam(event, 'id')

  const records = await db.select([
    'connection_id',
    'local',
    'system',
  ])
  .from('status_mappings')
  .where('connection_id', id)

  return records
})
