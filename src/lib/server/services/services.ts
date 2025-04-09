import type { UserCredentialsData, UserData } from '$lib/server/auth/model'

export interface AuthService {
  requireAuth(): Promise<UserData>
  credentials(form: FormData): UserCredentialsData
  login(credentials: UserCredentialsData): Promise<UserData>
  logout(): Promise<void>
  getCurrentUser(): Promise<UserData | null>
}
