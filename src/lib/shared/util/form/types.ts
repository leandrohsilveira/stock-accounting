export type FieldTypes = 'text' | 'file' | 'email' | 'number' | 'choice' | 'pattern'

interface AbstractField {
  required?: boolean
  type: FieldTypes
  default?: string
}

export type RequiredField<T extends FieldKind> = T &
  (
    | {
      required: true
      default?: undefined
    }
    | {
      required?: false
      default: T extends StringField<infer D> ? D : string
    }
  )

export type OptionalField<T extends FieldKind> = T & {
  required?: false
  default?: T extends StringField<infer D> ? D : string
}

export type Field = OptionalField<FieldKind> | RequiredField<FieldKind>

export type FieldKind = StringField | NumberField | FileField

export type StringField<T extends string = string> =
  | TextField
  | ChoiceField<T>
  | EmailField
  | PatternField

export interface TextField extends AbstractField {
  type: 'text'
  minLength?: number
  maxLength?: number
}

export interface PatternField extends AbstractField {
  type: 'pattern'
  pattern: string
  name: string
}

export interface ChoiceField<O extends string = string> extends AbstractField {
  type: 'choice'
  options: O[]
  default?: O
}

export interface NumberField extends AbstractField {
  type: 'number'
  decimal?: number
  min?: number
  max?: number
}

export interface EmailField extends AbstractField {
  type: 'email'
  maxLength?: number
}

export interface FileField extends AbstractField {
  type: 'file'
  maxSize?: number
}

type FormMapField<T> = T extends FileField
  ? FileField
  : T extends number
  ? NumberField
  : T extends string
  ? StringField<T>
  : StringField

export type FormMapInput<T> = {
  [K in keyof T]: T[K] extends undefined | null
  ? OptionalField<FormMapField<T[K]>>
  : RequiredField<FormMapField<T[K]>>
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
