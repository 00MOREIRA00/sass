import { z } from 'zod'

export const userSubject = z.tuple([
  z.union([
    z.literal('delete'),
    z.literal('update'),
    z.literal('get'),
    z.literal('invite'),
    z.literal('manage'),
  ]),
  z.literal('User'),
])

export type ProjectUser = z.infer<typeof userSubject>
