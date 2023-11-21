import { Knex } from 'knex'
import jwt from 'jsonwebtoken'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  // const path = getRequestURL(event).pathname
  // if (path.startsWith('/api') && path !== '/api/auth/login') {
  //   const app = useNitroApp()
  //   const db: Knex = app.knex
  //
  //   let token = getRequestHeader(event, 'Authorization')
  //   if (token) {
  //     token = token.substring(7, token.length)
  //   } else {
  //     token = getCookie(event, 'auth:token')
  //   }
  //   if (!token) throw new Error('Unauthorized')
  //
  //   const decoded: any = jwt.verify(token, process.env.NITRO_KEY)
  //
  //   if (!decoded) throw new Error('Unauthorized')
  //
  //   const result = await db('users')
  //   .select(['id', 'username'])
  //   .where('id', decoded.sub)
  //   .limit(1)
  //
  //   if (result.length !== 1) throw new Error('Unauthorized')
  //
  //   event.context.user = result[0]
  // }
})
