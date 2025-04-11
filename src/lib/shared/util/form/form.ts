import type {
  FormMapInput,
  ValidationResult,
  ErrorsMap,
  NumberField,
  FileField,
  TextField,
  ChoiceField,
  PatternField,
  EmailField,
  StringField,
  AnyField,
} from './types'

const EMAIL_REGEX = /^[A-z0-9.-_]+@[A-z0-9.-_]+/

export function validateFormData<T>(
  data: FormData | HTMLFormElement,
  input: FormMapInput<T>,
): ValidationResult<T> {
  if (!(data instanceof FormData)) return validateFormData(new FormData(data), input)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value = {} as any
  const errors = {} as ErrorsMap<T>

  let valid = true

  for (const [name, field] of Object.entries(input) as [keyof T, AnyField][]) {
    const formValue = data.get(String(name))

    if (field.required && (formValue === '' || (formValue ?? null) === null)) {
      valid = false
      errors[name] = {
        message: 'Required field',
        key: 'required',
      }
      continue
    }

    switch (field.type) {
      case 'text':
        valid = validateTextField(name, formValue, field, errors, valid)
        value[name] = formValue ?? field.default
        continue
      case 'choice':
        valid = validateChoiceField(name, formValue, field, errors, valid)
        value[name] = formValue ?? field.default
        continue
      case 'pattern':
        valid = validatePatternField(name, formValue, field, errors, valid)
        value[name] = formValue ?? field.default
        continue
      case 'email':
        valid = validateEmailField(name, formValue, field, errors, valid)
        value[name] = formValue ?? field.default
        continue
      case 'number':
        valid = validateNumberField(name, formValue, field, errors, valid)
        value[name] = Number(formValue ?? field.default)
        continue
      case 'file':
        valid = validateFileField(name, formValue, field, errors, valid)
        value[name] = formValue ?? field.default
        continue
    }
  }

  if (!valid)
    return {
      valid: false,
      invalid: true,
      value: undefined,
      errors,
    }

  return {
    valid: true,
    invalid: false,
    errors,
    value,
  }
}

function validateNumberField<T>(
  name: keyof T,
  value: FormDataEntryValue | null,
  field: NumberField,
  errors: ErrorsMap<T>,
  valid: boolean,
) {
  if (value === null || value === undefined || value === '') return valid
  const numberValue = Number(value)
  if (Number.isNaN(numberValue)) {
    errors[name] = {
      message: 'Must be a valid number',
      key: 'number',
    }
    return false
  }
  if (typeof field.max === 'number' && numberValue > field.max) {
    errors[name] = {
      message: `Must not be higher than ${field.max}`,
      key: 'max',
      params: {
        max: field.max,
      },
    }
    return false
  }
  if (typeof field.min === 'number' && numberValue > field.min) {
    errors[name] = {
      message: `Must not be higher than ${field.min}`,
      key: 'min',
      params: {
        min: field.min,
      },
    }
    return false
  }
  return valid
}

function validateFileField<T>(
  name: keyof T,
  value: FormDataEntryValue | null,
  field: FileField,
  errors: ErrorsMap<T>,
  valid: boolean,
) {
  if (value === null || value === undefined || value === '') return valid
  if (!(value instanceof File)) {
    errors[name] = {
      message: 'Must be a file',
      key: 'file',
    }
    return false
  }

  if (typeof field.maxSize === 'number' && value.size > field.maxSize) {
    errors[name] = {
      message: `File size must not exceed the limit of ${field.maxSize} byte(s)`,
      key: 'maxSize',
      params: {
        maxSize: field.maxSize,
      },
    }
    return false
  }

  return valid
}

const validateTextField = validateStringField<TextField>((name, value, field, errors, valid) => {
  if (typeof field.maxLength === 'number' && value.length > field.maxLength) {
    errors[name] = {
      message: `Lenght limit of ${field.maxLength} exceeded`,
      key: 'maxLength',
      params: {
        maxLength: field.maxLength,
      },
    }
    return false
  }
  if (typeof field.minLength === 'number' && value.length < field.minLength) {
    errors[name] = {
      message: `Must have length greater than ${field.minLength}`,
      key: 'minLength',
      params: {
        minLength: field.minLength,
      },
    }
    return false
  }
  return valid
})

const validateChoiceField = validateStringField<ChoiceField>(
  (name, value, field, errors, valid) => {
    if (field.options.every((option) => option !== value)) {
      errors[name] = {
        message: `Value must be one of: ${field.options.join(', ')}`,
        key: 'choice',
        params: {
          options: field.options,
        },
      }
      return false
    }
    return valid
  },
)

const validatePatternField = validateStringField<PatternField>(
  (name, value, field, errors, valid) => {
    if (!new RegExp(field.pattern).test(value)) {
      errors[name] = {
        message: `Value must match ${field.name} pattern`,
        key: 'pattern',
        params: {
          pattern: field.pattern,
          name: field.name,
        },
      }
      return false
    }
    return valid
  },
)

const validateEmailField = validateStringField<EmailField>((name, value, _field, errors, valid) => {
  if (!EMAIL_REGEX.test(value)) {
    errors[name] = {
      message: 'Must be a valid email',
      key: 'email',
    }
    return false
  }
  return valid
})

function validateStringField<F extends StringField | ChoiceField>(
  validator: <T>(
    name: keyof T,
    value: string,
    field: F,
    errors: ErrorsMap<T>,
    valid: boolean,
  ) => boolean,
) {
  return <T>(
    name: keyof T,
    value: FormDataEntryValue | null,
    field: F,
    errors: ErrorsMap<T>,
    valid: boolean,
  ) => {
    if (value === null || value === undefined || value === '') return valid
    if (typeof value !== 'string') {
      errors[name] = {
        message: 'Must be a text',
        key: 'text',
      }
      return false
    }
    return validator(name, value, field, errors, valid)
  }
}
