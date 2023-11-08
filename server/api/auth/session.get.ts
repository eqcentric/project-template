export default defineEventHandler(async (event) => {
  return JSON.parse(JSON.stringify(event.context.user))
})
