<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getUrlParams } from '../composable/getUrlParam'

const router = useRouter()
const currentRoute = useRoute()

const { create: initialCreate } = getUrlParams(window.location.search)

const create = ref(Boolean(initialCreate) ?? false)

const toggleCreate = () => {
  let updatedQuery = { ...currentRoute.query }

  if (!create.value) {
    create.value = true
    updatedQuery.create = 'true'
  } else {
    create.value = false
    delete updatedQuery.create
  }

  const updatedRoute = { ...currentRoute, query: updatedQuery }

  router.replace(updatedRoute)
}
</script>

<template>
  <button
    aria-label="Create company button"
    name="Create company button"
    className="flex h-20 w-full items-center justify-center rounded-l-full border-2 border-gray-input p-2 hover:opacity-80"
    @click="toggleCreate"
  >
    <div
      className="mr-auto flex items-center justify-center rounded-full border-2 border-gray-input px-3 py-2.5"
    >
      <img
        src="../assets/images/clipboard-list-icn.svg"
        width="14"
        height="20"
        alt="A gray clipboard icon"
      />
    </div>
    <p className="mr-auto text-gray-brand">Adicionar empresa</p>
  </button>
</template>
