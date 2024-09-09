<script lang="ts" setup>
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { PhotoIcon } from '@heroicons/vue/24/solid'
import Dashboard from '@/layouts/dashboard.vue'
import { QuillEditor } from '@vueup/vue-quill'
import { reactive, ref } from 'vue'

const form = reactive({
  title: '',
  content: null,
  images: null,
  status: 'Draft'
})

const imageFile = ref<File | null>(null)
const imagePreview = ref<strin | null>(null)

async function handleImageUpload(event: Event) {
  const files = (event.target as HTMLInputElement).files
  if (files && files.length > 0) {
    imageFile.value = files[0]
    form.images = imageFile.value

    // Créer un aperçu de l'image sélectionnée
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string
    }
    reader.readAsDataURL(imageFile.value)
  }
}

async function handleSubmit() {
  console.log(form)
}
</script>


<template>
  <Dashboard>
    <div class="divide-y overflow-hidden rounded-lg bg-white shadow ">
      <form @submit.prevent="handleSubmit" class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="space-y-12">
          <div class="border-b border-gray-900/10 pb-12">
            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div class="sm:col-span-4">
                <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Tire</label>
                <div class="mt-2">
                  <div
                    class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input type="text" name="title" id="title" v-model="form.title" autocomplete="title"
                           class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                           placeholder="Nouvelle mise à jour !" />
                  </div>
                </div>
              </div>

              <div class="col-span-full border-gray-700 min-h-32">
                <label for="about" class="block text-sm font-medium leading-6 text-gray-900">Content</label>
                <div class="mt-2 min-h-32">
                  <QuillEditor v-model:content="form.content"
                               contentType="delta"
                               theme="snow"
                               toolbar="full"
                               placeholder="Rédigez votre contenu ici..."
                               class="overflow-auto min-h-32 border-gray-700" />
                </div>
              </div>

              <div class="col-span-full">
                <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Images</label>
                <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div class="text-center">
                    <PhotoIcon class="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                    <div class="mt-4 flex text-sm leading-6 text-gray-600">
                      <label for="file-upload"
                             class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" @change="handleImageUpload" class="sr-only" />
                      </label>
                      <p class="pl-1">or drag and drop</p>
                    </div>
                    <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                    <div v-if="imagePreview" class="mt-4">
                      <p class="text-sm font-medium text-gray-900">Aperçu de l'image :</p>
                      <img :src="imagePreview" alt="Aperçu" class="mt-2 h-32 w-32 object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="border-b border-gray-900/10 pb-12">
            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Status</label>
                <div class="mt-2">
                  <select id="country" name="country" autocomplete="country-name" v-model="form.status"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                    <option>Draft</option>
                    <option>Publish</option>
                    <option>Archives</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
          <button type="submit"
                  class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Save
          </button>
        </div>
      </form>
    </div>
  </Dashboard>
</template>
