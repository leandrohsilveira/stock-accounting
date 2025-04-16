import { validateFormData, type FormMapInput, type FormState } from '$lib/shared/util/form'
import type { ActionResult, SubmitFunction } from '@sveltejs/kit'

type MaybePromise<T> = Promise<T> | T

export interface LoadingController {
  isLoading: boolean
}

export interface EnhancedInput<
  T,
  S extends Record<string, unknown>,
  F extends Record<string, unknown>,
> {
  state?: FormState<T>
  loading?: LoadingController
  reset?: boolean
  invalidateAll?: boolean
  onSubmit?: () => MaybePromise<void>
  onSuccess?: (data: S | null) => MaybePromise<void>
  onFailure?: (data: F | null) => MaybePromise<void>
  onError?: (err: App.Error) => MaybePromise<void>
  onRedirect?: (location: string) => MaybePromise<void>
  onComplete?: (result: ActionResult<S, F>) => MaybePromise<void>
}

export function enhanced<T, S extends Record<string, unknown>, F extends Record<string, unknown>>(
  formMap: FormMapInput<T>,
  input: EnhancedInput<T, S, F>,
): SubmitFunction<S, F> {
  return async ({ formData, cancel }) => {
    try {
      const { invalid, value, errors } = validateFormData(formData, formMap)

      if (input.state) {
        input.state.errors = errors
        input.state.value = value ?? null
      }

      if (invalid) {
        return cancel()
      }

      if (input.loading) input.loading.isLoading = true
      await input.onSubmit?.()

      return async ({ result, update }) => {
        try {
          switch (result.type) {
            case 'redirect':
              return await input.onRedirect?.(result.location)
            case 'error':
              return await input.onError?.(result.error)
            case 'success':
              return await input.onSuccess?.(result.data ?? null)
            case 'failure':
              return await input.onFailure?.(result.data ?? null)
          }
        } finally {
          // This seems to be a Typescript bug. This block IS reachable.
          await update({
            reset: input.reset,
            invalidateAll: input.invalidateAll,
          })
          if (input.loading) input.loading.isLoading = false
        }
      }
    } catch (err) {
      if (input.loading) input.loading.isLoading = false
      throw err
    }
  }
}
