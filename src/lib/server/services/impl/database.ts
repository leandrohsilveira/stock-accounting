import { DATABASE_KEY, DATABASE_URL } from '$env/static/private'
import { createServerClient } from '@supabase/ssr'
import type { Cookies } from '@sveltejs/kit'
import type { DatabaseService } from '$lib/server/services'

export function createDatabase(cookies: Cookies): DatabaseService {
  return createServerClient(DATABASE_URL, DATABASE_KEY, {
    cookies: {
      getAll: () => cookies.getAll(),
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookies.set(name, value, { ...options, path: '/' })
        })
      },
    },
  })
}
