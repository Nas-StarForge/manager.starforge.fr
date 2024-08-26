// import type { HttpContext } from '@adonisjs/core/http'

import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'

export default class DiscordsController {
  async index({ inertia, params }: HttpContext) {
    return inertia.render('profiles/link/discord', { user_id: params.id })
  }

  async unlinkDiscord({ auth, response }: HttpContext) {
    const userAuth = auth.user!
    const user = await User.findOrFail(userAuth.id)
    await user.unlinkDiscord()

    return response.redirect().toRoute('profile')
  }

  async linkDiscord({ ally }: HttpContext) {
    return ally.use('discord').redirect()
  }

  async discordCallback({ ally, auth, response }: HttpContext) {
    const discord = ally.use('discord')
    if (discord.accessDenied()) {
      return 'Access was denied'
    }

    if (discord.stateMisMatch()) {
      return 'Request expired. Please try again.'
    }
    if (discord.hasError()) {
      return discord.getError()
    }

    const discordUser = await discord.user()
    const user = await User.findOrFail(auth.user!.id)

    user.merge({ discordId: discordUser.id })
    await user.save()

    return response.redirect().toRoute('profile')
  }
}
