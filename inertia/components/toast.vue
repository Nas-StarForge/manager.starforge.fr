<script lang="ts" setup>
import { onMounted, watch } from 'vue'
import { router, usePage } from '@inertiajs/vue3'
import { useToast } from 'vue-toastification'
import type { TYPE } from 'vue-toastification'

type ToasterType = {
  type: string
  message: string
}

const toast = useToast()
const page = usePage()

onMounted(() => {
  if (page.props.toast) {
    toast(page.props.toast.message, {
      type: page.props.toast.type as TYPE,
    })
  }
})

watch(
  () => page.props.toast,
  async (newVal: ToasterType) => {
    if (newVal) {
      toast(newVal.message, {
        type: newVal.type as TYPE,
      })

      setTimeout(() => {
        const redirect = page.props.redirect
        if (redirect) {
          router.reload(redirect)
        }
      }, 2000)
    }
  },
)
</script>
