<script lang="ts" setup>
import { DateTime } from 'luxon'
import { computed, reactive } from 'vue'
import type User from '~/app/models/user'
import { router, usePage } from '@inertiajs/vue3'

import Layout from '@/layouts/default.vue'

const page = usePage()
const user = computed(() => page.props.user as User)
const errors = computed(() => page.props.errors)

const lastUsernameChangedAt = DateTime.fromISO(user.value.lastUsernameChangAt)
const nextAvailableDate = lastUsernameChangedAt.plus({ days: 30 })
const currentDate = DateTime.now()

const canChangeUsername = computed(() => {
  return currentDate >= nextAvailableDate
})

const form = reactive({
  username: user.value.username || '',
  email: '',
  currentPassword: '',
  newPassword: '',
})

async function handleChangeMail() {
  router.post('/profile/settings/changMail', form)
  form.email = ''
}

async function handleChangePassword() {
  router.post('/profile/settings/changePassword', form)
  form.newPassword = ''
  form.currentPassword = ''
}

async function handleChangeUsername() {
  router.post('/profile/settings/changeUsername', form)
}

async function toggleDiscordLink() {
  if (user.value.discordId) {
    router.post('/discord/unlink')
  } else {
    router.visit('http://localhost:3333/discord/link')
  }
}
</script>

<template>
  <Layout title="Settings">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      <div class="bg-white shadow rounded-lg p-6">
        <div v-if="errors" class="text-red-500">
          <div v-if="errors.email">
            {{ errors.email[0] }}
          </div>
        </div>
        <h3 class="text-xl font-semibold mb-4">Changer l'Email</h3>
        <form @submit.prevent="handleChangeMail">
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div class="mt-2">
              <input
                id="email"
                v-model="form.email"
                type="email"
                name="email"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Mettre à jour l'Email
          </button>
        </form>
      </div>

      <div class="bg-white shadow rounded-md p-6">
        <h3 class="text-xl font-semibold mb-4">Lier/Délier le Compte Discord</h3>
        <div v-if="user.discordId">
          <p class="text-gray-500 mb-4">
            Compte lié:
            <strong>{{ user.discordUsername }}</strong>
          </p>
          <button
            class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            @click="toggleDiscordLink"
          >
            Délier le Compte Discord
          </button>
        </div>
        <div v-else>
          <p class="text-gray-500 mb-4">Aucun compte Discord lié</p>
          <a
            class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            href="/discord/link"
          >
            Lier le Compte Discord
          </a>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-6">
        <div v-if="errors" class="text-red-500">
          <div v-if="errors.newPassword">
            {{ errors.newPassword[0] }}
          </div>
          <div v-if="errors.currentPassword">
            {{ errors.currentPassword[0] }}
          </div>
        </div>
        <h3 class="text-xl font-semibold mb-4">Changer le Mot de Passe</h3>
        <form @submit.prevent="handleChangePassword">
          <div class="mb-4">
            <label for="current-password" class="block text-sm font-medium text-gray-700">
              Mot de Passe Actuel
            </label>
            <input
              id="current-password"
              v-model="form.currentPassword"
              type="password"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            />
          </div>
          <div class="mb-4">
            <label for="new-password" class="block text-sm font-medium text-gray-700">
              Nouveau Mot de Passe
            </label>
            <input
              id="new-password"
              v-model="form.newPassword"
              type="password"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            />
          </div>
          <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Changer le Mot de Passe
          </button>
        </form>
      </div>

      <!-- Carte pour changer le pseudo avec une limite de temps -->
      <div class="bg-white shadow rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-4">Changer le Pseudo</h3>
        <form @submit.prevent="handleChangeUsername">
          <div class="mb-4">
            <label for="username" class="block text-sm font-medium text-gray-700">
              Nouveau Pseudo
            </label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              :disabled="!canChangeUsername"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
            />
          </div>
          <button
            :disabled="!canChangeUsername"
            type="submit"
            class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            Changer le Pseudo
          </button>
          <p v-if="!canChangeUsername" class="mt-2 text-sm text-red-500">
            Vous devez attendre 30 jours avant de changer à nouveau votre pseudo.
          </p>
        </form>
      </div>
    </div>
  </Layout>
</template>

<style>
input[type] {
  width: 100%;
  padding: 10px 12px;
  margin: 8px 0;
  box-sizing: border-box;
}
</style>
