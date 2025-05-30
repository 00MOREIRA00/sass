import { AbilityBuilder } from '@casl/ability'
import { AppAbility } from '.'
import { User } from './models/user'
import { Role } from './roles'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>
) => void

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN: (user, { can, cannot }) => {
    can('manage', 'all'),
    
    cannot('transfer_ownership', 'Organization')
    can('transfer_ownership', 'Organization', { ownerId: { $eq: user.id } })
  },

  MEMBER: (user, { can }) => {
    can('get', 'User')
    can(['create', 'get'], 'Project')
    can(['update', 'delete'], 'Project', { ownerId: { $eq: user.id } })
  },

  BILLING: (_, { can }) => {
    can('manage', 'Billing')
  },
}





// Casl utiliza Mongo, dessa forma podemos fazer query de condição
// A gente tira a autorização e vai dando autorização aos poucos