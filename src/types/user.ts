type UserAccount = {
  id: string
  createdAt: Date
  updatedAt: Date
  active: boolean
  email: string
  password: string
  roles: Role[]
  profilName: string
  shortId: string
}

type UserSession = {
  id: string
  createdAt: Date
  updatedAt: Date
  active: boolean
  ip: string
  agent: string
  userId: string
}

enum Role {
  ROLE_ANONYMOUS,
  ROLE_USER
}

export type { UserAccount, Role, UserSession }
export { Role as RoleObj}