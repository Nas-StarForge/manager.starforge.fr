import type { HttpContext } from '@adonisjs/core/http'

import env from '#start/env'
import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth_validator'

export default class AuthController {
  async showlogin({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async showRegister({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  async register({ request, response, session }: HttpContext) {
    const data = await request.validateUsing(registerValidator)
    await User.create(data)

    session.flash('toast', {
      type: 'success',
      message: 'Le compte a été créé avec succès !',
    })

    return response.redirect().toRoute('auth.login')
  }

  async login({ request, response, session }: HttpContext) {
    const data = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(data.email, data.password)

    const oat = await User.accessTokens.create(user)

    response.cookie(String(env.get('AUTH_COOKIE_NAME')), oat.value!.release(), {
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    })

    session.flash('toast', {
      type: 'success',
      message: 'Connexion effectuée !',
    })

    return response.redirect().toRoute('profile')
  }

  async logout({ response, session }: HttpContext) {
    response.clearCookie(String(env.get('AUTH_COOKIE_NAME')))

    session.flash('toast', {
      type: 'success',
      message: 'Vous avez été déconnecté.',
    })
    return response.redirect().toRoute('auth.login')
  }
}
