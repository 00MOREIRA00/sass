import { defineAbilityFor } from '@saas/auth'
import { projectSchema } from '@saas/auth/src/models/project'

const ability = defineAbilityFor({ role: 'MEMBER', id: 'user-id' })

//const project = projectSchema.parse({id: 'project-id', ownerId: 'user-id2'})

const userCanInviteSomeoneElese = ability.can('manage', 'Billing')
const userCanDeleteOtherUsers = ability.can('delete', 'User')
const userCannotDeleteOtherUsers = ability.can('delete', 'Project')
//const userCannotDeleteOtherUsers = ability.can('delete', project)



console.log(userCanInviteSomeoneElese)
console.log(userCanDeleteOtherUsers)
console.log(userCannotDeleteOtherUsers)






















// Quando eu pergunto de um usuário pode deletar um projeto, eu tenho que passar o projeto, pois se eu não passar o projeto, ele não vai saber qual projeto eu estou falando e dessa forma ele vai levantar true, pois ele pode deletar um projeto mas somente um que o ownerId seja igual ao id do usuário que está tentando deletar