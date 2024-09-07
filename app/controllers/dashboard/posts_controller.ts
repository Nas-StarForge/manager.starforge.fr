import type { HttpContext } from '@adonisjs/core/http'
import Post from '#models/post'

export default class DashboardPostsController {
  async index({ inertia }: HttpContext) {
    const posts = await Post.query().paginate(1, 10)
    return inertia.render('dashboard/posts/index', posts)
  }

  async create({ inertia }: HttpContext) {
    return inertia.render('dashboard/posts/create')
  }
}
