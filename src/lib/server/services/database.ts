import { assert } from '$lib/shared/util'
import { type PostgrestError, type SupabaseClient } from '@supabase/supabase-js'

export type DatabaseService = SupabaseClient

export type DatabaseError = PostgrestError

export function assertNoError(error: DatabaseError | null, message: string): asserts error is null {
  assert(error === null, () => new Error(`Database error: ${message}`, { cause: error }))
}
