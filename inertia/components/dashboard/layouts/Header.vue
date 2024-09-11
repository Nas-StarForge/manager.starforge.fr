<template>
  <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
    <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden" @click="$emit('toggle-sidebar')">
      <Bars3Icon class="h-6 w-6" aria-hidden="true" />
    </button>
    <div class="flex flex-1 justify-end">
      <slot></slot> <!-- Add flexibility for custom header content -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { Bars3Icon } from '@heroicons/vue/24/outline'
</script>
