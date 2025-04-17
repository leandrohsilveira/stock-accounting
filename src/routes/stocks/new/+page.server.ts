import { stockMutationFormMap } from '$lib/shared/models'
import { validateFormData } from '$lib/shared/util/form'
import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions = {
  async default({ request, locals: { auth, stock } }) {
    const user = await auth.requireAuth()

    const { invalid, value, errors } = validateFormData(
      await request.formData(),
      stockMutationFormMap,
    )

    if (invalid) {
      return {
        success: false,
        errors,
      }
    }

    await stock.create(user.id, value)

    redirect(307, '/stocks')
  },
} satisfies Actions
