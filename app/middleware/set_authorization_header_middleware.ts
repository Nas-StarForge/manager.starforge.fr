import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import env from '#start/env'

export default class SetAuthorizationHeaderMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const token = ctx.request.cookie(String(env.get('AUTH_COOKIE_NAME')))

    if (token) {
      ctx.request.headers().authorization = `Bearer ${token}`
    }

    const output = await next()
    return output
  }
}
