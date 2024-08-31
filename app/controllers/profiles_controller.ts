import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import { emailValidator } from '#validators/user'

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
}
