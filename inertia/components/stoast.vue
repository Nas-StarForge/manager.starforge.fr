<script lang="ts" setup>
import { watch } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { useToast } from 'vue-toastification'
import type { TYPE } from 'vue-toastification'

type ToasterType = {
  type: string
  message: string
}

const toast = useToast()
const page = usePage()

watch(
  () => page.props.toast,
  (newVal: ToasterType) => {
    toast(newVal.message, {
      type: newVal.type as TYPE,
    })
  },
)
</script>
