import { NitroApp } from 'nitropack'
import knex from 'knex'

export default defineNitroPlugin((nitro: NitroApp) => {

  nitro.knex = knex({
    client: 'mysql',
    connection: {
      host : process.env.NITRO_MYSQL_SERVER,
      port : process.env.NITRO_MYSQL_PORT,
      user : process.env.NITRO_MYSQL_USERNAME,
      password : process.env.NITRO_MYSQL_PASSWORD,
      database : process.env.NITRO_MYSQL_DATABASE,
    }
  })

  nitro.hooks.hookOnce("close", async () => {
    // await db.
  });
})
