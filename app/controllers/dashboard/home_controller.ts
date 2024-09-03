import type { HttpContext } from '@adonisjs/core/http'

import DashboardPolicy from '#policies/dashboard_policy'

export default class HomeDashboardController {
  async index({ inertia, bouncer, session }: HttpContext) {
    if (await bouncer.with(DashboardPolicy).denies('view')) {
      return session.flash('toast', {
        type: 'success',
        message: "Vous n'avez pas le permission",
      })
    }
    return inertia.render('dashboard/home')
  }
}
