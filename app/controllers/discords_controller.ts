import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'

export default class DiscordsController {
  async index({ inertia, params }: HttpContext) {
    return inertia.render('profiles/link/discord', { user_id: params.id })
  }

  async unlinkDiscord({ auth, response, session }: HttpContext) {
    const userAuth = auth.user!
    const user = await User.findOrFail(userAuth.id)
    await user.unlinkDiscord()

    session.flash('toast', {
      type: 'success',
      message: 'Votre compte Discord a été dissocié avec succès.',
    })

    return response.redirect().toRoute('profile')
  }

  async linkDiscord({ ally }: HttpContext) {
    return ally.use('discord').redirect()
  }

  async discordCallback({ ally, auth, response, session }: HttpContext) {
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

    user.merge({ discordId: discordUser.id, discordUsername: discordUser.nickName })
    await user.save()

    session.flash('toast', {
      type: 'success',
      message: 'Votre compte Discord a été lié avec succès.',
    })

    return response.redirect().toRoute('profile')
  }
}
