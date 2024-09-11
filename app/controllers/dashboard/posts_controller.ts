import type { HttpContext } from '@adonisjs/core/http'
import { attachmentManager } from '@jrmc/adonis-attachment'

import Post from '#models/post'

export default class DashboardPostsController {
  async index({ inertia }: HttpContext) {
    const posts = await Post.query().paginate(1, 5)
    return inertia.render('dashboard/posts/index', { posts })
  }

  async create({ inertia }: HttpContext) {
    return inertia.render('dashboard/posts/create')
  }

  async store({ request, response }: HttpContext) {
    console.log(request.body())
    const avatar = request.file('images')!
    const data = request.body()
    await Post.create({
      title: data.title,
      content: data.content,
      imageUrl: await attachmentManager.createFromFile(avatar),
      status: data.status,
    })
    return response.redirect().toRoute('dashboard.posts')
  }

  async destroy({ params, response }: HttpContext) {
    const post = await Post.findOrFail(params.id)
    await post.delete()
    return response.redirect().toRoute('dashboard.posts')
  }
}
