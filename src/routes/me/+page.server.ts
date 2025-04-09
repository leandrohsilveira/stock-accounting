import { changePasswordFormMap, userUpdateFormMap } from '$lib/shared/models'
import { validateFormData } from '$lib/shared/util/form'
import type { Actions, PageServerLoadEvent } from './$types'

export async function load({ locals: { auth } }: PageServerLoadEvent) {
  const currentUser = await auth.requireAuth()

  return {
    currentUser,
  }
}

export const actions = {
  async updateData({ request, locals: { auth } }) {
    await auth.requireAuth()

    const form = await request.formData()

    const { invalid, value, errors } = validateFormData(form, userUpdateFormMap)

    if (invalid) {
      return { success: false, updateErrors: errors }
    }

    await auth.updateCurrentUser(value)

    return { success: true }
  },

  async changePassword({ request, locals: { auth } }) {
    await auth.requireAuth()

    const form = await request.formData()

    const { invalid, value, errors } = validateFormData(form, changePasswordFormMap)

    if (invalid) {
      return { success: false, passwordErrors: errors }
    }

    await auth.changePassword(value)

    return { success: true }
  },
} satisfies Actions
