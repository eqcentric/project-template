import { Knex } from 'knex'

export default defineEventHandler(async (event) => {

  const app = useNitroApp()
  const db: Knex = app.knex

  const { id } = event.context.params

  const records = await db.select('*')
  .from('assets')
  .where('connection_id', id)

  return records.map(r => ({
    deviceId: r.device_id,
    assetKey: r.asset_key,
  }))
})
