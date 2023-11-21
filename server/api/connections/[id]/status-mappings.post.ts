import { Knex } from 'knex'
import _ from 'lodash'

export default defineEventHandler(async (event) => {

  const app = useNitroApp()
  const db: Knex = app.knex

  const id = getRouterParam(event, 'id')

  const body = await readBody<any>(event)

  await db.delete().from('status_mappings')
    .where('connection_id', '=', id)

  await db.insert(Object.values(_.mapValues(body, (v) => ({
    ...v,
    connection_id: id,
  })))).into('status_mappings')

  return {}
})
