import { Knex } from 'knex'

import { validateOrReject } from 'class-validator'
import { AssetsMappingDto } from '../../../dto/AssetsMapping.dto'

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

  const body = await readBody<AssetsMappingDto>(event)
  await validateOrReject(body)

  await db.from('assets')
  .where('connection_id', id)
  .andWhere('device_id', body.deviceId)
  .delete()

  if (body.assetKey) {
    await db('assets').insert({
      device_id: body.deviceId,
      asset_key: body.assetKey,
      connection_id: id,
    })

    return {
      device_id: body.deviceId,
      asset_key: body.assetKey,
      connection_id: id,
    }
  } else {
    return {
      device_id: body.deviceId,
      asset_key: null,
      connection_id: id,
    }
  }
})
