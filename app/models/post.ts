import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'

import User from '#models/user'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare title: string

  @column()
  declare content: string

  @column()
  declare imageUrl: string

  @column()
  declare userId: string

  @column()
  declare publishedAt: DateTime | null

  @column()
  declare status: 'draft' | 'publish'

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static generateUUID(model: Post) {
    model.id = randomUUID()
  }
}
