import { AbilityBuilder } from '@casl/ability'
import { AppAbility } from '.'
import { User } from './models/user'
import { Role } from './roles'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>
) => void

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN: (_, { can }) => {
    can('manage', 'all')
  },

  MEMBER: (user, { can }) => {
    can(['get', 'create'], 'Project'),
    can(['update', 'delete'], 'Project', { ownerId: { $eq: user.id } })
  },

  BILLING: (_, { can }) => {
    can('get', 'Billing')
  },
}

//Casl utiliza Mongo, dessa forma podemos fazer query de condição
