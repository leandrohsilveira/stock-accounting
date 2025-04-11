// See https://svelte.dev/docs/kit/types#app.d.ts

import type { AuthService, CustomerService, DatabaseService } from '$lib/server/services'

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      database: DatabaseService
      auth: AuthService
      customer: CustomerService
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {}
