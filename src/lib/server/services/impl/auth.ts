import { getRequestEvent } from '$app/server'
import { assertNoError, type AuthService, type DatabaseService } from '$lib/server/services'
import type {
  UserChangePasswordData,
  UserCredentialsData,
  UserUpdateData,
} from '$lib/shared/models'
import { assert } from '$lib/shared/util'
import { redirect } from '@sveltejs/kit'

export class AuthServiceImpl implements AuthService {
  constructor(private database: DatabaseService) {}

  async login(credentials: UserCredentialsData) {
    assert(credentials.type === 'password', 'Only the password credentials type is supported')
    const { data, error } = await this.database.auth.signInWithPassword({
      email: credentials.username,
      password: credentials.password,
    })

    assertNoError(error, 'Authentication failed')

    const { user } = data
    assert(user.email, 'User must have a email!')

    return {
      id: user.id,
      displayName: user.user_metadata.displayName ?? user.email,
      email: user.email,
    }
  }

  async requireAuth() {
    const user = await this.getCurrentUser()
    if (!user) {
      const event = getRequestEvent()
      const url = new URL('/login', event.url.origin)
      url.searchParams.set('next', event.url.pathname)
      redirect(307, url)
    }
    return user
  }

  async logout() {
    const { error } = await this.database.auth.signOut()
    assertNoError(error, 'Logout failure')
  }

  async getCurrentUser() {
    const {
      data: { session },
      error: sessionError,
    } = await this.database.auth.getSession()
    assertNoError(sessionError, 'Retrieve session failed')
    if (!session) return null

    const {
      data: { user },
      error: userError,
    } = await this.database.auth.getUser()
    assertNoError(userError, 'Retrieve user from session failed')

    if (!user) return null
    assert(user.email, 'User must have a email!')

    return {
      id: user.id,
      email: user.email,
      displayName: user.user_metadata.displayName ?? user.email,
    }
  }

  async updateCurrentUser(info: UserUpdateData) {
    const { data, error } = await this.database.auth.updateUser({
      data: info,
    })

    assertNoError(error, 'Update current user failed')

    assert(data.user.email, 'User must have a email!')
    return {
      id: data.user.id,
      displayName: data.user.user_metadata.displayName,
      email: data.user.email,
    }
  }

  async changePassword(data: UserChangePasswordData) {
    const { error } = await this.database.auth.updateUser({
      password: data.newPassword,
    })

    assertNoError(error, 'Update current user password failed')
  }
}
