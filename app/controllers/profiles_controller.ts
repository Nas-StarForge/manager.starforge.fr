import type { HttpContext } from '@adonisjs/core/http'

export default class ProfilesController {
  async show({ inertia }: HttpContext) {
    return inertia.render('profiles/show')
  }

  async showSettings({ inertia }: HttpContext) {
    return inertia.render('profiles/settings')
  }
}
