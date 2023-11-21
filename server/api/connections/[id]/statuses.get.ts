import { Knex } from 'knex'
import axios from 'axios'

export default defineEventHandler(async (event) => {

  const app = useNitroApp()
  const db: Knex = app.knex

  const id = getRouterParam(event, 'id')

  const records = await db.select([
    'id',
    'api_token',
  ])
  .from('connections')
  .where('dealer_id', id)
  .limit(1)

  if (records.length !== 1) {
    throw new Error('Not found')
  }

  let page = 1

  const statuses: any[] = []
  do {
    const { data } = await axios.get('https://api.makini.io/api/eam/statuses/work-orders', {
      headers: {
        Authorization: `Bearer ${records[0].api_token}`,
      },
      params: {
        page,
        pageSize: 100,
      },
      timeout: 60000,
    })
    statuses.push(...data.data)
    if (page >= data.meta.last_page) break;
    page++
  } while (true)

  return statuses
})
