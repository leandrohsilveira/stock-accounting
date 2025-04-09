import type {
  UserChangePasswordData,
  UserCredentialsData,
  UserData,
  UserUpdateData,
} from '$lib/shared/models'

export interface AuthService {
  requireAuth(): Promise<UserData>
  login(credentials: UserCredentialsData): Promise<UserData>
  logout(): Promise<void>
  getCurrentUser(): Promise<UserData | null>
  updateCurrentUser(data: UserUpdateData): Promise<UserData>
  changePassword(data: UserChangePasswordData): Promise<void>
}
