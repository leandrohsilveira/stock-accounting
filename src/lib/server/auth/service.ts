import { getRequestEvent } from '$app/server'
import type { AuthService, DatabaseService } from '$lib/server/services'
import { assert } from '$lib/shared/util'
import { redirect } from '@sveltejs/kit'

export function createAuthService(database: DatabaseService): AuthService {
  return {
    async login(credentials) {
      assert(credentials.type === 'password', 'Only the password credentials type is supported')
      const { data, error } = await database.auth.signInWithPassword({
        email: credentials.username,
        password: credentials.password,
      })

      assert(error === null, error?.message ?? 'Authentication failed')

      const { user } = data
      assert(user.email, 'User must have a email!')

      return {
        id: user.id,
        displayName: user.user_metadata.displayName ?? user.email,
        email: user.email,
      }
    },
    async requireAuth() {
      const user = await this.getCurrentUser()
      if (!user) {
        const event = getRequestEvent()
        const url = new URL('/login', event.url.origin)
        url.searchParams.set('next', event.url.pathname)
        redirect(307, url)
      }
      return user
    },
    async logout() {
      const { error } = await database.auth.signOut()
      assert(error === null, error?.message ?? 'Logout failure')
    },
    async getCurrentUser() {
      const {
        data: { session },
        error: sessionError,
      } = await database.auth.getSession()
      assert(sessionError === null, sessionError?.message ?? 'Retrieve session failed')
      if (!session) return null

      const {
        data: { user },
        error: userError,
      } = await database.auth.getUser()
      assert(userError === null, userError?.message ?? 'Retrieve user from session failed')
      if (!user) return null
      assert(user.email, 'User must have a email!')
      return {
        id: user.id,
        email: user.email,
        displayName: user.user_metadata.displayName ?? user.email,
      }
    },
    credentials(form) {
      const username = form.get('username')
      const password = form.get('password')

      assert(typeof username === 'string', 'Username/E-mail form field should be a string')
      assert(typeof password === 'string', 'Password form field should be a string')

      return {
        type: 'password',
        username,
        password,
      }
    },
  }
}
