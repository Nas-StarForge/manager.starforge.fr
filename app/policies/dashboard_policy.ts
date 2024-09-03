import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'

import type User from '#models/user'

export default class DashboardPolicy extends BasePolicy {
  view(user: User): AuthorizerResponse {
    return user.hasPermission('Dashboard')
  }
}
