import router from '@adonisjs/core/services/router'

import { middleware } from '#start/kernel'

const ProfilesController = () => import('#controllers/profiles_controller')
const DiscordsController = () => import('#controllers/discords_controller')

const AuthController = () => import('#controllers/auth_controller')
router.on('/').renderInertia('home', { version: 6 }).as('home')

router
  .group(() => {
    router.get('/login', [AuthController, 'showlogin']).as('auth.login')
    router.get('/register', [AuthController, 'showRegister']).as('auth.register')
    router.post('/login', [AuthController, 'login'])
    router.post('/register', [AuthController, 'register'])
    router.get('/link/:id', [DiscordsController, 'linkDiscord']).as('auth.callback')
  })
  .prefix('auth')

router
  .group(() => {
    router.get('/link', [DiscordsController, 'linkDiscord']).as('discord.link')
    router.post('/unlink', [DiscordsController, 'unlinkDiscord']).as('discord.unlink')
    router.get('/callback', [DiscordsController, 'discordCallback']).as('discord.callback')
  })
  .prefix('discord')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/', [ProfilesController, 'show']).as('profile')
  })
  .prefix('profile')
  .use(middleware.auth())
