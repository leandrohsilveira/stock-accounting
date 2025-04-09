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
