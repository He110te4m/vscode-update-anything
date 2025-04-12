import { z } from 'zod'

export const filesValidator = z.array(z.string())
export const replacementsValidator = z.array(z.object({
  find: z.string(),
  replace: z.string(),
}))
