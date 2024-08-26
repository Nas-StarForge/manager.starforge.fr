<script lang="ts" setup>
import { computed } from 'vue'
import { router, usePage } from '@inertiajs/vue3'

const page = usePage()
const user = computed(() => page.props.user)

async function unlinkDiscord() {
  router.post('/discord/unlink')
}
</script>

<template>
  <div class="max-w-3xl mx-auto py-10">
    <div class="bg-white shadow-md rounded-lg p-6">
      <h1 class="text-2xl font-semibold text-gray-800 mb-6">Mon Profil</h1>

      <div class="space-y-4">
        <div>
          <h2 class="text-xl font-medium text-gray-700">Informations Générales</h2>
          <p class="text-gray-600">Nom d'utilisateur : {{ user.username }}</p>
          <p class="text-gray-600">Email : {{ user.email }}</p>
        </div>

        <div>
          <h2 class="text-xl font-medium text-gray-700">Compte Discord</h2>
          <div v-if="user.discordId" class="flex items-center space-x-4">
            <p class="text-green-600">Votre compte Discord est actuellement lié.</p>
            <button
              class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              @click="unlinkDiscord"
            >
              Dissocier mon compte Discord
            </button>
          </div>
          <div v-else class="flex items-center space-x-4">
            <p class="text-yellow-600">Vous n'avez pas encore lié votre compte Discord.</p>
            <a
              href="/discord/link"
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Lier mon compte Discord
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
