export type FieldTypes = 'text' | 'file' | 'email' | 'number' | 'choice' | 'pattern'

type RequiredField<T> =
  | {
      required: true
      default?: undefined
    }
  | {
      required?: false
      default: T
    }

type OptionalField<T> = {
  required?: false
  default?: T
}

type AbstractField = {
  type: FieldTypes
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyField = (Field<any> | ChoiceField<any>) & (OptionalField<any> | RequiredField<any>)

export type Field<T> = T extends string
  ? StringField
  : T extends number
    ? NumberField
    : T extends File
      ? FileField
      : never

export type StringField = TextField | EmailField | PatternField

export type TextField = AbstractField & {
  type: 'text'
  minLength?: number
  maxLength?: number
}

export type PatternField = AbstractField & {
  type: 'pattern'
  pattern: string
  name: string
}

export type ChoiceField<T = string> = AbstractField & {
  type: 'choice'
  options: T[]
}

export type NumberField = AbstractField & {
  type: 'number'
  decimal?: number
  min?: number
  max?: number
}

export type EmailField = AbstractField & {
  type: 'email'
  maxLength?: number
}

export type FileField = AbstractField & {
  type: 'file'
  maxSize?: number
}

export type FormMapInput<T> = {
  [K in keyof T]-?: (T[K] extends string | number | File
    ? RequiredField<T[K]>
    : OptionalField<T[K]>) &
    (T[K] extends string ? Field<T[K]> | ChoiceField<T[K]> : Field<T[K]>)
}

export type ValidationResult<T> = ValidationSuccess<T> | ValidationError<T>

export interface ValidationSuccess<T> {
  valid: true
  invalid: false
  value: T
  errors: ErrorsMap<T>
}

export interface ValidationError<T> {
  valid: false
  invalid: true
  value: undefined
  errors: ErrorsMap<T>
}

export type ErrorsMap<T> = {
  [K in keyof T]: ValidationMessage | null
}

export interface ValidationMessage {
  message: string
  key: string
  params?: Record<string, unknown>
}
