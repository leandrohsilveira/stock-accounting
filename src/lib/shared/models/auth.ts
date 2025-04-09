import { type FormMapInput } from '../util/form'

export type UserCredentialsData = UsernamePasswordCredentialsData

export interface UsernamePasswordCredentialsData {
  type: 'password'
  username: string
  password: string
}

export interface UserData {
  id: string
  email: string
  displayName: string
}

export interface UserUpdateData {
  displayName: string
}

export interface UserContext {
  currentUser: UserData | null
}

export interface UserChangePasswordData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export const passwordCredentialsFormMap: FormMapInput<UsernamePasswordCredentialsData> = {
  type: {
    type: 'choice',
    options: ['password'],
    default: 'password',
  },
  username: {
    required: true,
    type: 'email',
  },
  password: {
    required: true,
    type: 'text',
  },
}

export const changePasswordFormMap: FormMapInput<UserChangePasswordData> = {
  currentPassword: {
    required: true,
    type: 'text',
  },
  newPassword: {
    required: true,
    type: 'text',
  },
  confirmPassword: {
    required: true,
    type: 'text',
  },
}

export const userUpdateFormMap: FormMapInput<UserUpdateData> = {
  displayName: {
    required: true,
    type: 'text',
  },
}
