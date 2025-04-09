type AssertErrorInput = string | Error | (() => Error | string)

export function assert(value: unknown, error: AssertErrorInput): asserts value {
  if (!value) throwError(error)
}

export function assertString(value: unknown, error: AssertErrorInput): asserts value is string {
  assert(typeof value === 'string', error)
}

function throwError(error: AssertErrorInput): never {
  if (error instanceof Error) throw error
  if (typeof error === 'function') throw throwError(error())
  throw new Error(error ?? 'Assertion failed')
}
