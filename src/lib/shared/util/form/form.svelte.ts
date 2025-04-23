import type { ActionReturn } from 'svelte/action'
import { validateFormData } from './form'
import type { ErrorsMap, FormMapInput, ValidationResult } from './types'
import { untrack } from 'svelte'

export interface FormState<T> {
  value: T | null
  errors: ErrorsMap<T>
}

export interface CreateFormOptions<T> {
  state?: FormState<T>
  onSubmit?(e: Event, result: ValidationResult<T>): void
  onValidSubmit?(e: Event, value: T): void
  onInvalidSubmit?(e: Event, errors: ErrorsMap<T>): void
}

export function createFormState<T>(
  serverErrors?: () => ErrorsMap<T> | null | undefined,
): FormState<T> {
  let value = $state<T | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let errors = $state<ErrorsMap<T>>(serverErrors?.() ?? ({} as any))

  $effect(() => {
    const errs = untrack(() => errors)
    const serverErrs = serverErrors?.()
    if (serverErrs) {
      errors = {
        ...errs,
        ...serverErrs,
      }
    }
  })

  return {
    get value() {
      return value
    },
    set value(newValues) {
      value = newValues
    },
    get errors(): ErrorsMap<T> {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return new Proxy(errors as any, {
        get(target, p) {
          if (target) {
            return target[p]
          }
          return null
        },
      })
    },
    set errors(newErrors) {
      errors = newErrors
    },
  }
}

export function createForm<T>(input: FormMapInput<T>, options?: CreateFormOptions<T>) {
  return (node: HTMLFormElement): ActionReturn => {
    node.noValidate = true
    const state = options?.state
    node.addEventListener('submit', handleSubmit)

    if (state) {
      node.addEventListener('input', handleInput)
    }

    return {
      destroy() {
        node.removeEventListener('submit', handleSubmit)
        if (state) {
          node.removeEventListener('input', handleInput)
        }
      },
    }

    function handleInput(e: Event) {
      if (state) {
        const target = e.target as HTMLInputElement
        const name = target.name
        if (name in state.errors && state.errors[name as keyof T]) {
          state.errors = {
            ...state.errors,
            [target.name]: null,
          }
        }
      }
    }

    function handleSubmit(e: Event) {
      const result = validateFormData(new FormData(node), input)
      if (result.invalid) {
        e.preventDefault()
        if (state) {
          state.value = null
          state.errors = result.errors
        }
        options?.onSubmit?.(e, result)
        options?.onInvalidSubmit?.(e, result.errors)
        return
      }
      if (state) {
        state.errors = result.errors
        state.value = result.value
      }
      options?.onSubmit?.(e, result)
      options?.onValidSubmit?.(e, result.value)
    }
  }
}
