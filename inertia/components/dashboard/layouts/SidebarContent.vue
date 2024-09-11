<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3'

defineProps<{
  navigation: { name: string, href: string, icon: string }[]
}>()

import { HomeIcon, UsersIcon, DocumentDuplicateIcon, FolderIcon } from '@heroicons/vue/24/outline'

const resolveIcon = (iconName: string) => {
  const icons = { HomeIcon, UsersIcon, DocumentDuplicateIcon, FolderIcon }
  return icons[iconName] || HomeIcon
}

const page = usePage()

const isActive = (href: string) => page.url === href
</script>

<template>
  <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
    <div class="flex h-16 shrink-0 items-center">
      <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
           alt="Your Company" />
    </div>
    <nav class="flex flex-1 flex-col">
      <ul role="list" class="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" class="-mx-2 space-y-1">
            <li v-for="item in navigation" :key="item.name">
              <Link :href="item.href"
                    :class="[isActive(item.href) ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white', 'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6']">
                <component :is="resolveIcon(item.icon)" class="h-6 w-6 shrink-0" aria-hidden="true" />
                {{ item.name }}
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>
