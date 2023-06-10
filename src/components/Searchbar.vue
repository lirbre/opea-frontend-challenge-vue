<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const search = ref('')

const router = useRouter()
const currentRoute = useRoute()

const updateRoute = (e: Event) => {
  e.preventDefault()
  let updatedQuery = { ...currentRoute.query }

  if (search.value) {
    updatedQuery.search = search.value
  } else {
    delete updatedQuery.search
  }
  const updatedRoute = { ...currentRoute, query: updatedQuery }

  router.replace(updatedRoute)
}
</script>

<template>
  <form
    className="flex w-full max-w-xs gap-1.5 rounded-opea border-2 border-gray-input bg-white py-1 pr-2.5"
    @submit="updateRoute"
  >
    <input
      v-model="search"
      className="w-full max-w-xs rounded-opea bg-transparent px-2.5 py-1 text-sm tracking-wide text-gray-font"
      placeholder="Buscar empresa..."
    />
    <button type="submit" className="rounded-full bg-transparent">
      <img
        src="../assets/images/search-icn.svg"
        width="16"
        height="16"
        alt="A magnifying glass icon"
      />
    </button>
  </form>
</template>
