import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
// import Database from '@ioc:Adonis/Lucid/Database'

export default class PostsController {
  public async index({}: HttpContextContract) {
    const posts = await Post.query().orderBy('id')

    return posts
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['title', 'content', 'slug'])
    const post = await Post.create(data)

    return post
  }

  public async show({ params }: HttpContextContract) {
    // const post = await Database.rawQuery(`select * from posts where id = ${params.id}`)
    const post = await Post.findOrFail(params.id)

    return post
  }

  public async update({ request, params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    const data = request.only(['title', 'content'])

    post.merge(data)

    await post.save()

    return post
  }

  public async destroy({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    await post.delete()
  }
}
