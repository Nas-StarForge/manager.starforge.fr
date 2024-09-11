<script lang="ts" setup>
import { computed } from 'vue'
import type User from '~/app/models/user'
import { usePage } from '@inertiajs/vue3'

import Date from '@/components/date.vue'
import Layout from '@/layouts/default.vue'

const page = usePage()
const user = computed(() => page.props.user as User)
</script>

<template>
  <Layout title="Mon Profil">
    <div class="md:flex no-wrap md:-mx-2">
      <div class="w-full md:w-3/12 md:mx-2">
        <div class="bg-white p-3 border-t-4 border-green-400">
          <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">{{ user.username }}</h1>
          <h3 class="text-gray-600 font-lg text-semibold leading-6">Fondateur</h3>
          <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">
            Fondateur et développeur de StarForge, je mes tout en oeuvre pour vous offrir la meilleure expérience possible.
          </p>
          <ul class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
            <li class="flex items-center py-3">
              <span>Status</span>
              <span class="ml-auto">
                <span class="bg-green-500 py-1 px-2 rounded text-white text-sm">En Ligne</span>
              </span>
            </li>
            <li class="flex items-center py-3">
              <span>Inscript depuis</span>
              <span class="ml-auto"><Date :date="user.createdAt" /></span>
            </li>
          </ul>
        </div>
      </div>
      <div class="w-full md:w-9/12 mx-2 h-64">
        <div class="bg-white p-3 shadow-sm rounded-sm">
          <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
            <span clas="text-green-500">
              <!-- TODO: Icon -->
            </span>
            <span class="tracking-wide">Informations</span>
          </div>
          <div class="text-gray-700">
            <div class="grid md:grid-cols-2 text-sm">
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">Pseudo</div>
                <div class="px-4 py-2">{{ user.username }}</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">Uuid</div>
                <div class="px-4 py-2">{{ user.id }}</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">Email.</div>
                <div class="px-4 py-2">{{ user.email }}</div>
              </div>
              <div class="grid grid-cols-2">
                <div class="px-4 py-2 font-semibold">Temps de jeux</div>
                <div class="px-4 py-2">2 mois, 32 jours, 10 heures</div>
              </div>
            </div>
          </div>
          <button class="block w-full text-blue-800 text-sm font-semibold rounded-lg p-3 my-4">Plus de nouveautés bientôt</button>
        </div>
      </div>
    </div>
  </Layout>
</template>
