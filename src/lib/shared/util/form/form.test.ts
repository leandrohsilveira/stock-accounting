import { describe, expect, it } from 'vitest'
import type { FormMapInput } from './types'
import { validateFormData } from './form'

describe('validateFormData function', () => {
  describe('given form map with required text', () => {
    const map: FormMapInput<{ name: string }> = {
      name: {
        type: 'text',
        required: true,
      },
    }

    it('should return invalid with a error message when the field value is empty', () => {
      const data = new FormData()
      data.set('name', '')

      const { valid, invalid, value, errors } = validateFormData(data, map)

      expect(valid).toBe(false)
      expect(invalid).toBe(true)
      expect(value).toBeUndefined()
      expect(errors).toEqual({ name: { key: 'required', message: 'Required field' } })
    })

    it('should return valid with the value when the field is not empty', () => {
      const data = new FormData()
      data.set('name', 'value')

      const { valid, invalid, value, errors } = validateFormData(data, map)

      expect(valid).toBe(true)
      expect(invalid).toBe(false)
      expect(value).toEqual({ name: 'value' })
      expect(errors).toEqual({})
    })
  })

  describe('given form map with min length text', () => {
    const map: FormMapInput<{ name?: string }> = {
      name: {
        type: 'text',
        minLength: 3,
      },
    }

    it('should return invalid with a error message when the field value length is lower than minimum', () => {
      const data = new FormData()
      data.set('name', 'as')

      const { valid, invalid, value, errors } = validateFormData(data, map)

      expect(valid).toBe(false)
      expect(invalid).toBe(true)
      expect(value).toBeUndefined()
      expect(errors).toEqual({
        name: {
          key: 'minLength',
          message: 'Must have length greater than 3',
          params: { minLength: 3 },
        },
      })
    })

    it('should return valid with the value when the field value length is greater than minimum', () => {
      const data = new FormData()
      data.set('name', 'value')

      const { valid, invalid, value, errors } = validateFormData(data, map)

      expect(valid).toBe(true)
      expect(invalid).toBe(false)
      expect(value).toEqual({ name: 'value' })
      expect(errors).toEqual({})
    })
  })

  describe('given form map with max length text', () => {
    const map: FormMapInput<{ name?: string }> = {
      name: {
        type: 'text',
        maxLength: 3,
      },
    }

    it('should return invalid with a error message when the field value length is greater than maximum', () => {
      const data = new FormData()
      data.set('name', 'value')

      const { valid, invalid, value, errors } = validateFormData(data, map)

      expect(valid).toBe(false)
      expect(invalid).toBe(true)
      expect(value).toBeUndefined()
      expect(errors).toEqual({
        name: {
          key: 'maxLength',
          message: 'Length limit of 3 exceeded',
          params: { maxLength: 3 },
        },
      })
    })

    it('should return valid with the value when the field value length is lower than maximum', () => {
      const data = new FormData()
      data.set('name', 'val')

      const { valid, invalid, value, errors } = validateFormData(data, map)

      expect(valid).toBe(true)
      expect(invalid).toBe(false)
      expect(value).toEqual({ name: 'val' })
      expect(errors).toEqual({})
    })
  })

  describe('given form map with required number', () => {
    const map: FormMapInput<{ age: number }> = {
      age: {
        type: 'number',
        required: true,
      },
    }

    it('should return invalid with a error message when the field value is not set', () => {
      const data = new FormData()

      const { valid, invalid, value, errors } = validateFormData(data, map)

      expect(valid).toBe(false)
      expect(invalid).toBe(true)
      expect(value).toBeUndefined()
      expect(errors).toEqual({
        age: {
          key: 'required',
          message: 'Required field',
        },
      })
    })

    it('should return invalid with a error message when the field value is a text', () => {
      const data = new FormData()
      data.set('age', 'value')

      const { valid, invalid, value, errors } = validateFormData(data, map)

      expect(valid).toBe(false)
      expect(invalid).toBe(true)
      expect(value).toBeUndefined()
      expect(errors).toEqual({
        age: {
          key: 'number',
          message: 'Must be a valid number',
        },
      })
    })

    it('should return valid with the value when the field value is a number', () => {
      const data = new FormData()
      data.set('age', '1')

      const { valid, invalid, value, errors } = validateFormData(data, map)

      expect(valid).toBe(true)
      expect(invalid).toBe(false)
      expect(value).toEqual({ age: 1 })
      expect(errors).toEqual({})
    })
  })
})
