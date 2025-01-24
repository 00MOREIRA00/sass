import { z } from 'zod'

export const billingSubject = z.tuple([
  z.union([
    z.literal('export'),
    z.literal('get'),
    z.literal('manage'),

  ]),
  z.literal('Billing'),
])

export type ProjectSubject = z.infer<typeof billingSubject>
