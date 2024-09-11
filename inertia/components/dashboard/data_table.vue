<script lang="ts" setup>
import Post from '~/app/models/post'

defineProps<{
  data: Post[],
  columns: { label: string, field: string }[]
}>()
</script>

<template>
  <div>
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <slot name="header"></slot>
      </div>
    </div>

    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
              <tr>
                <th v-for="(column, index) in columns" :key="index" scope="col"
                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  {{ column.label }}
                </th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span v-if="$slots.actions" class="sr-only">Actions</span>
                </th>
              </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="(row, index) in data" :key="index">
                <td v-for="(column, colIndex) in columns" :key="colIndex"
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  <span v-if="column.field === 'roles'">
                      <span v-for="(role, roleIndex) in row.roles" :key="roleIndex">
                        {{ role.name }}<span v-if="roleIndex < row.roles.length - 1">, </span>
                      </span>
                    </span>
                  <span v-else>
                      {{ row[column.field] }}
                    </span>
                </td>
                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <slot name="actions" :row="row"></slot>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
