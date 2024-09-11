<template>
  <div class="bg-slate-100">
    <Sidebar :navigation="navigation" />
    <div class="lg:pl-72">
      <Header @toggle-sidebar="toggleSidebar">
        <UserMenu :userNavigation="userNavigation" />
      </Header>
      <main class="py-10">
        <div class="px-4 sm:px-6 lg:px-8">
          <Breadcrumb/>
          <toast />
          <div class="pt-4">
            <slot />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '@/components/dashboard/layouts/Sidebar.vue'
import Header from '@/components/dashboard/layouts/Header.vue'
import UserMenu from '@/components/dashboard/layouts/UserMenu.vue'
import Breadcrumb from '@/components/dashboard/layouts/Breadcrumb.vue'
import toast from '@/components/toast.vue'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: 'HomeIcon' },
  { name: 'Users', href: '/dashboard/users', icon: 'UsersIcon' },
  { name: 'Posts', href: '/dashboard/posts', icon: 'DocumentDuplicateIcon' },
  { name: 'Shop', href: '#', icon: 'FolderIcon' }
]

const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' }
]

const sidebarOpen = ref(false)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}
</script>
