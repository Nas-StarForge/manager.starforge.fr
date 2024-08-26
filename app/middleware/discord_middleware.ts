import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class DiscordMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const user = ctx.auth.user!

    if (!user.discordId) {
      return ctx.response.redirect().toRoute('discord.index')
    }

    return next()
  }
}
