import type { HttpContext } from '@adonisjs/core/http'

export default class ProfilesController {
  async show({ inertia, auth }: HttpContext) {
    const user = auth.user!
    return inertia.render('profiles/show', { user })
  }
}
