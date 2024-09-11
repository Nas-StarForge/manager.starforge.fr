<script lang="ts" setup>
import Dashboard from '@/layouts/dashboard.vue'
import DataTable from '@/components/dashboard/data_table.vue'
import { usePage, Link, router } from '@inertiajs/vue3'
import { computed } from 'vue'

const page = usePage()
const posts = computed(() => page.props.users.data)

const postColumns = [
  { label: 'Pseudo', field: 'username' },
  { label: 'Email', field: 'email' },
  { label: 'Role', field: 'roles' }
]

function deleteUser(id: number) {
  if (confirm('Are you sure you want to delete this post?')) {
    router.delete(`/dashboard/users/${id}`)
  }
}
</script>

<template>
  <Dashboard>
    <div class="mt-8">
      <DataTable :data="posts" :columns="postColumns">
        <template #header>
          <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
              <h1 class="text-xl font-semibold text-gray-900">Utilisateurs</h1>
            </div>
            <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <Link href="/dashboard/users/create" class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Créer un Utilisateur
              </Link>
            </div>
          </div>
        </template>

        <template #actions="{ row }">
          <Link :href="`/dashboard/posts/${row.id}/edit`" class="text-indigo-600 hover:text-indigo-900">Modifier</Link>
          <Button @click="deleteUser(row.id)" class="pl-2 text-red-600 hover:text-red-900">Supprimer</Button>
        </template>
      </DataTable>
    </div>
  </Dashboard>
</template>
