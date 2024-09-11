import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class UserPreloadMiddleware {
  async handle({ auth }: HttpContext, next: NextFn) {
    const user = auth.user
    await user?.load('roles')
    console.log(user)

    return next()
  }
}
