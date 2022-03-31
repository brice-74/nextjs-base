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

enum Role {
  ROLE_ANONYMOUS,
  ROLE_USER
}

export type { UserAccount, Role }
export { Role as RoleObj}