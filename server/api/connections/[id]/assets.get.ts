import { Knex } from 'knex'

import axios from 'axios'

export default cachedEventHandler(async (event) => {

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

  let assets = []
  let page = 1

  do {
    const { data } = await axios.get('https://api.makini.io/api/assets', {
      headers: {
        Authorization: `Bearer ${records[0].api_token}`,
      },
      params: {
        page: page,
      }
    })
    assets.push(...data.data.map(a => ({
      name: a.name,
      key: a.key,
      manufacturerName: a.manufacturerName,
      modelName: a.modelName,
      serialNumber: a.serialNumber,
    })))
    if (page < data.meta.last_page) {
      page++
    }
    else break;
  } while (true)

  return assets
}, {
  swr: true,
  maxAge: 120,
  staleMaxAge: -1,
  getKey: (event) => `makini/assets/${event.context.params.id}`,
})
