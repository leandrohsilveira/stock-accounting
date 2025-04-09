import { validUrl } from '$lib/shared/util'
import { redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoadEvent } from './$types'
import { passwordCredentialsFormMap } from '$lib/shared/models'
import { validateFormData } from '$lib/shared/util/form'

export async function load({ url }: PageServerLoadEvent) {
  return {
    next: url.searchParams.get('next') ?? '/',
  }
}

export const actions = {
  async login({ url, request, locals: { auth } }) {
    const form = await request.formData()
    const { valid, value, errors } = validateFormData(form, passwordCredentialsFormMap)
    if (!valid) {
      return { success: false, errors }
    }
    await auth.login(value)
    const next = String(form.get('next'))
    redirect(302, validUrl(next, url) ?? '/')
  },

  async logout({ locals: { auth } }) {
    await auth.logout()

    redirect(302, '/')
  },
} satisfies Actions
