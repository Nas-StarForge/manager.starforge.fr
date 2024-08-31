import vine from '@vinejs/vine'

export const emailValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique(async (db, value) => {
        const match = await db.from('users').select('id').where('email', value).first()
        return !match
      }),
  }),
)

export const PasswordValidator = vine.compile(
  vine.object({
    currentPassword: vine.string().minLength(8),
    newPassword: vine.string().minLength(8),
  }),
)
