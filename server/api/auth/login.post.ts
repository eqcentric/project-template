import { Knex } from 'knex'
import { LoginDto } from '../../dto/Login.dto'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { validateOrReject } from 'class-validator'

export default defineEventHandler(async (event) => {

  const app = useNitroApp()
  const db: Knex = app.knex

  const body = await readBody<LoginDto>(event)

  await validateOrReject(body)

  const result = await db('users')
    .where('username', body.username)
    .limit(1)

  if (result.length === 0) {
    throw new Error('Unauthorized')
  }

  const user = result[0]

  const check = await bcrypt.compare(body.password, user.password)
  if (!check) {
    throw new Error('Unauthorized')
  }

  const accessToken = jwt.sign({
  }, process.env.NITRO_KEY, {
    subject: user.id.toString(),
  })

  return {
    token: accessToken,
  }
})
