export function assert(
  value: unknown,
  error: string | Error | (() => Error | string),
): asserts value {
  if (!value) throwError(error)
}

function throwError(error: string | Error | (() => Error | string)): never {
  if (error instanceof Error) throw error
  if (typeof error === 'function') throw throwError(error())
  throw new Error(error ?? 'Assertion failed')
}
