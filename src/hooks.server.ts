import { createDatabase } from '$lib/server/database/service'
import { createAuthService } from '$lib/server/auth/service'
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
  event.locals.auth = createAuthService(event.locals.database)

  return resolve(event)
}

export const handle = sequence(database, auth)
