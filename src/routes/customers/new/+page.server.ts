import { customerMutationFormMap } from '$lib/shared/models'
import { validateFormData } from '$lib/shared/util/form'
import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions = {
  async default({ request, locals: { auth, customer } }) {
    const user = await auth.requireAuth()

    const { invalid, value, errors } = validateFormData(
      await request.formData(),
      customerMutationFormMap,
    )

    if (invalid) {
      return {
        success: false,
        errors,
      }
    }

    await customer.create(user.id, value)

    redirect(307, '/customers')
  },
} satisfies Actions
