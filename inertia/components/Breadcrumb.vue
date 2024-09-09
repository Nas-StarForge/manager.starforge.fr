<script setup lang="ts">
import { HomeIcon } from '@heroicons/vue/20/solid'
import { computed } from 'vue'
import { usePage } from '@inertiajs/vue3'

const page = usePage()

const breadcrumbPages = computed(() => {
  const pathSegments = page.url.split('/').filter(segment => segment)
  if (page.url === '/dashboard') {
    return [ {
      name: 'Home',
      href: '/dashboard'
    } ]
  }

  const filteredSegments = pathSegments.filter(segment => segment !== 'dashboard')

  return filteredSegments.map((segment, index) => ({
    name: segment.charAt(0).toUpperCase() + segment.slice(1),
    href: '/' + filteredSegments.slice(0, index + 1).join('/')
  }))
})
</script>

<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol role="list" class="flex space-x-4 rounded-md bg-white px-6 shadow">
      <li class="flex">
        <div class="flex items-center">
          <a href="/dashboard" class="text-gray-400 hover:text-gray-500">
            <HomeIcon class="h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <span class="sr-only">Home</span>
          </a>
        </div>
      </li>
      <li v-for="(page, index) in breadcrumbPages" :key="index" class="flex">
        <div class="flex items-center">
          <svg class="h-full w-6 flex-shrink-0 text-gray-200" viewBox="0 0 24 44" preserveAspectRatio="none"
               fill="currentColor" aria-hidden="true">
            <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
          </svg>
          <a
            :href="page.href"
            class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
            :aria-current="index === breadcrumbPages.length - 1 ? 'page' : undefined"
          >
            {{ page.name }}
          </a>
        </div>
      </li>
    </ol>
  </nav>
</template>
