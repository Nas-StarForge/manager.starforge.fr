import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { ManyToMany } from '@adonisjs/lucid/types/relations'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { BaseModel, beforeCreate, column, manyToMany } from '@adonisjs/lucid/orm'

import Role from '#models/role'
import type Permission from '#models/permission'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare username: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare discordId: string | null

  @column()
  declare discordUsername: string | null

  @column.dateTime()
  declare lastUsernameChangAt: DateTime | null

  @manyToMany(() => Role, {
    pivotTable: 'user_roles',
  })
  declare roles: ManyToMany<typeof Role>

  @beforeCreate()
  static async setUUID(user: User) {
    user.id = randomUUID()
    user.lastUsernameChangAt = DateTime.now()
  }

  async unlinkDiscord() {
    this.discordId = null
    this.discordUsername = null
    await this.save()
  }

  async hasPermission(permissionName: string): Promise<boolean> {
    const roles = await this.related('roles').query().preload('permissions')
    return roles.some((role: Role) =>
      role.permissions.some((permission: Permission) => permission.name === permissionName),
    )
  }

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)
}
