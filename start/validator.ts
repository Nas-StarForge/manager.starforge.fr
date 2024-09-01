import vine, { SimpleMessagesProvider } from '@vinejs/vine'

import { JSONAPIErrorReporter } from '#start/json_api_error_reporter'

vine.messagesProvider = new SimpleMessagesProvider({
  'username.unique': 'Le pseudo est déjà utilisé.',
  'username.minLength': 'Votre pseudo doit avoir un minimum de 3 caractères.',
  'email.required': "L'adresse e-mail est requise.",
  'email': "L'adresse e-mail n'est pas valide.",
  'database.unique': "L'adresse e-mail est déjà utilisée.",
  'password.required': 'Le mot de pass est requise.',
  'password.minLength': 'Le mot de passe doit contenir au moins 8 caractères.',
})

vine.errorReporter = () => new JSONAPIErrorReporter()
