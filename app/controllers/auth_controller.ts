import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import env from '#start/env'
import { loginValidator, registerValidator } from '#validators/auth_validator'

export default class AuthController {
  async showlogin({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async showRegister({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  async register({ request, response }: HttpContext) {
    console.log(request.all())
    const data = await request.validateUsing(registerValidator)
    const user = await User.create(data)

    return response.redirect().toRoute('auth.login')
  }

  async login({ request, response }: HttpContext) {
    const data = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(data.email, data.password)

    const oat = await User.accessTokens.create(user)

    response.cookie(String(env.get('AUTH_COOKIE_NAME')), oat.value!.release(), {
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    })

    return response.redirect().toRoute('home')
  }
}
