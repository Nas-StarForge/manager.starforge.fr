import router from '@adonisjs/core/services/router'

import { middleware } from '#start/kernel'
import DashboardPostsController from '#controllers/dashboard/posts_controller'

const HomeDashboardController = () => import('#controllers/dashboard/home_controller')

const ProfilesController = () => import('#controllers/profiles_controller')
const DiscordsController = () => import('#controllers/discords_controller')

const AuthController = () => import('#controllers/auth_controller')

router
  .group(() => {
    router.get('/login', [AuthController, 'showlogin']).as('auth.login')
    router.get('/register', [AuthController, 'showRegister']).as('auth.register')
    router.post('/login', [AuthController, 'login'])
    router.post('/register', [AuthController, 'register'])
    router.post('/logout', [AuthController, 'logout']).as('auth.logout')
  })
  .prefix('auth')

router
  .group(() => {
    router.on('/').renderInertia('home', { version: 6 }).as('home')

    router
      .group(() => {
        router.get('/link', [DiscordsController, 'linkDiscord']).as('discord.link')
        router.post('/unlink', [DiscordsController, 'unlinkDiscord']).as('discord.unlink')
        router.get('/callback', [DiscordsController, 'discordCallback']).as('discord.callback')
      })
      .prefix('discord')

    router
      .group(() => {
        router.get('/', [ProfilesController, 'show']).as('profile')
        router.get('/settings', [ProfilesController, 'showSettings']).as('profile.settings')
        router.post('/settings/changMail', [ProfilesController, 'changeMail']).as('profile.settings.changmail')
        router.post('/settings/changePassword', [ProfilesController, 'changePassword']).as('profile.settings.changpassword')
        router.post('/settings/changeUsername', [ProfilesController, 'changeUsername']).as('proifle.settings.changUsername')
      })
      .prefix('profile')

    router
      .group(() => {
        router.get('/', [HomeDashboardController, 'index'])

        router.group(() =>  {
          router.get('/', [DashboardPostsController, 'index']).as('dashboard.posts')
          router.get('/create', [DashboardPostsController, 'create']).as('dashboard.posts.create')
        }).prefix('/posts')
      })
      .prefix('dashboard')
  })
  .use(middleware.auth())
