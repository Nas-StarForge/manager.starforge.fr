import router from '@adonisjs/core/services/router'

const AuthController = () => import('#controllers/auth_controller')
router.on('/').renderInertia('home', { version: 6 }).as('home')

router
  .group(() => {
    router.get('/login', [AuthController, 'showlogin']).as('auth.login')
    router.get('/register', [AuthController, 'showRegister']).as('auth.register')
    router.post('/login', [AuthController, 'login'])
    router.post('/register', [AuthController, 'register'])
  })
  .prefix('auth')
