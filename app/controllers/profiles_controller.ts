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

  async changeMail({ request, auth, response }: HttpContext) {
    const data = await request.validateUsing(emailValidator)
    const user = await User.findOrFail(auth.user!.id)

    user.merge({ email: data.email })
    await user.save()

    return response.redirect().toRoute('profile.settings')
  }

  async changePassword({ request, response, auth, session }: HttpContext) {
    const data = await request.validateUsing(PasswordValidator)
    const user = auth.user! as User

    if (!(await hash.verify(user.password, data.currentPassword))) {
      session.flash('errors', {
        currentPassword: ['password is invalid'],
      })
      return response.redirect().toRoute('profile.settings')
    }

    user.password = data.newPassword
    await user.save()

    return response.redirect().toRoute('profile.settings')
  }
}
