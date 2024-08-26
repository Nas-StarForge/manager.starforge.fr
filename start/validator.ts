import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  'username.unique': 'test',
  'email.required': 'Email is required',
  'email': 'Email is invalid',
  'database.unique': '{{ field }} is already taken !',
  'password.required': 'Password is required',
  'password.min': 'Password must be at least 8 characters',
})
