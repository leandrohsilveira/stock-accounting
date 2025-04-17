import { stockMutationFormMap } from '$lib/shared/models'
import { validateFormData } from '$lib/shared/util/form'
import { error, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params: { id }, locals: { auth, stock } }) => {
  await auth.requireAuth()

  const result = await stock.getById(id)

  if (result === null) error(404, { message: 'Stock not found' })

  return {
    stock: result,
  }
}

export const actions = {
  async default({ request, params, locals: { auth, stock } }) {
    await auth.requireAuth()

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

    await stock.update(params.id, value)

    redirect(307, '/stocks')
  },
} satisfies Actions
