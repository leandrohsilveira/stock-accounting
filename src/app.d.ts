// See https://svelte.dev/docs/kit/types#app.d.ts

import type { AuthService, DatabaseService } from '$lib/server/services'

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      database: DatabaseService
      auth: AuthService
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export { }
