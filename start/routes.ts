import router from '@adonisjs/core/services/router'

import { middleware } from '#start/kernel'

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
        router
          .post('/settings/changMail', [ProfilesController, 'changeMail'])
          .as('profile.settings.changmail')
        router
          .post('/settings/changePassword', [ProfilesController, 'changePassword'])
          .as('profile.settings.changpassword')
      })
      .prefix('profile')
  })
  .use(middleware.auth())
