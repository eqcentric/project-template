import { Knex } from 'knex'
import { validateOrReject } from 'class-validator'
import { ConnectionUpdateDto } from '../../dto/ConnectionUpdate.dto'

export default defineEventHandler(async (event) => {

  const app = useNitroApp()
  const db: Knex = app.knex

  const { id } = event.context.params

  const body = await readBody<ConnectionUpdateDto>(event)

  await validateOrReject(body)

  const found = (await db.from('connections')
  .where('id', id)
  .count('id', {
    as: 'count'
  }))[0]

  if (found['count'] !== 1) {
    throw new Error('Not found')
  }

  await db('connections').update({
    enabled: body.Enabled,
  }).where('id', id)

  return {
    id: id,
    Enabled: body.Enabled,
  }
})
