import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions = {
  async login({ url, request, locals: { auth } }) {
    const form = await request.formData()
    const credentials = auth.credentials(form)
    await auth.login(credentials)

    const target = new URL(url.searchParams.get('next') ?? '/', url.origin)

    redirect(302, target.pathname)
  },
  async logout({ locals: { auth } }) {
    await auth.logout()

    redirect(302, '/')
  },
} satisfies Actions
