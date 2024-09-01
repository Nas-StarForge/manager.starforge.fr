import { errors } from '@vinejs/vine'
import { ExceptionHandler } from '@adonisjs/core/http'
import type { HttpContext } from '@adonisjs/core/http'

export default class ValidatorException extends ExceptionHandler {
  async handle(error: unknown, ctx: HttpContext) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      error.messages.map((item: { detail: string }) => {
        ctx.session.flash('toast', {
          type: 'error',
          message: item.detail,
        })
      })
    }

    return super.handle(error, ctx)
  }
}
