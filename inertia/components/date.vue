<template>
  {{ formatedDate }}
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { DateTimeFormatOptions } from 'luxon'

const props = defineProps<{
  date: string
}>()

function formatDate() {
  const date = new Date(props.date)
  const options: DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return date.toLocaleDateString('fr-FR', options)
}

const formatedDate = computed(() => formatDate())
</script>
