import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import { emailValidator, PasswordValidator } from '#validators/user'

export default class ProfilesController {
  async show({ inertia }: HttpContext) {
    return inertia.render('profiles/show')
  }

  async showSettings({ inertia }: HttpContext) {
    return inertia.render('profiles/settings')
  }

  async changeMail({ request, auth, response, session }: HttpContext) {
    const data = await request.validateUsing(emailValidator)
    const user = await User.findOrFail(auth.user!.id)

    user.merge({ email: data.email })
    await user.save()

    session.flash('toast', {
      type: 'success',
      message: 'Email mis à jour !',
    })

    return response.redirect().toRoute('profile.settings')
  }

  async changePassword({ request, response, auth, session }: HttpContext) {
    const data = await request.validateUsing(PasswordValidator)
    const user = auth.user! as User

    if (!(await hash.verify(user.password, data.currentPassword))) {
      session.flash('toast', {
        type: 'error',
        message: 'Le mot de passe est incorrect.',
      })
      return response.redirect().toRoute('profile.settings')
    }

    user.password = data.newPassword
    await user.save()

    session.flash('toast', {
      type: 'success',
      message: 'Mot de passe mis à jour !',
    })

    return response.redirect().toRoute('profile.settings')
  }

  async changeUsername({ request, auth, response, session }: HttpContext) {
    const data = request.all()
    const user = auth.user! as User

    const thirtyDaysAgo = DateTime.now().minus({ days: 30 })

    if (user.lastUsernameChangAt && user.lastUsernameChangAt > thirtyDaysAgo) {
      return session.flash('toast', {
        type: 'warning',
        message: "Vous ne pouvez changer votre pseudo qu'une fois tous les 30 jours",
      })
    }

    user.username = data.username
    user.lastUsernameChangAt = DateTime.now()
    await user.save()

    session.flash('toast', {
      type: 'success',
      message: 'Pseudo mise a jour !',
    })

    return response.redirect().toRoute('profile.settings')
  }
}
