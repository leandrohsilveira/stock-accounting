// See https://svelte.dev/docs/kit/types#app.d.ts
import '@poppanator/sveltekit-svg/dist/svg'

import type {
  AuthService,
  CustomerService,
  DatabaseService,
  StockService,
} from '$lib/server/services'

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      database: DatabaseService
      auth: AuthService
      customer: CustomerService
      stock: StockService
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {}
