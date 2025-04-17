import { customerMutationFormMap } from '$lib/shared/models'
import { validateFormData } from '$lib/shared/util/form'
import { error, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params: { id }, locals: { auth, customer } }) => {
  await auth.requireAuth()

  const result = await customer.getById(id)

  if (result === null) error(404, { message: 'Customer not found' })

  return {
    customer: result,
  }
}

export const actions = {
  async default({ request, params, locals: { auth, customer } }) {
    await auth.requireAuth()

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

    await customer.update(params.id, value)

    redirect(307, '/customers')
  },
} satisfies Actions
