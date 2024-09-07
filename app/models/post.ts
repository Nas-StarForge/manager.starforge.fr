import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'
import { compose } from '@adonisjs/core/helpers'
import { BelongsTo } from '@adonisjs/lucid/types/relations'
import { attachment, Attachmentable } from '@jrmc/adonis-attachment'
import { Attachment } from '@jrmc/adonis-attachment/types/attachment'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'

import User from '#models/user'

export default class Post extends compose(BaseModel, Attachmentable) {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare title: string

  @column()
  declare content: string

  @attachment({ preComputeUrl: true, folder: 'uploads/posts' })
  declare imageUrl: Attachment

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
