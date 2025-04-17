import { AuthServiceImpl } from '$lib/server/services/impl/auth'
import { CustomerServiceImpl } from '$lib/server/services/impl/customer'
import { createDatabase } from '$lib/server/services/impl/database'
import { StockServiceImpl } from '$lib/server/services/impl/stock'
import type { Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

const database: Handle = ({ event, resolve }) => {
  event.locals.database = createDatabase(event.cookies)

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range' || name === 'x-supabase-api-version'
    },
  })
}

const auth: Handle = ({ event, resolve }) => {
  event.locals.auth = new AuthServiceImpl(event.locals.database)

  return resolve(event)
}

const customer: Handle = ({ event, resolve }) => {
  event.locals.customer = new CustomerServiceImpl(event.locals.database)

  return resolve(event)
}

const stock: Handle = ({ event, resolve }) => {
  event.locals.stock = new StockServiceImpl(event.locals.database)

  return resolve(event)
}

export const handle = sequence(database, auth, customer, stock)
