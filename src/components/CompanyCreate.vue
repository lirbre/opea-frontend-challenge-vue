<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { getUrlParams } from '../composable/getUrlParam';

const router = useRouter()
const currentRoute = useRoute()

const { create } = getUrlParams(window.location.search)

const toggleCreate = () => {
  let updatedQuery = { ...currentRoute.query }

  if (!!create) {
    updatedQuery.create = String(false)
  } else {
    updatedQuery.create = String(true)
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
      @click={toggleCreate}
    >
      <div className="mr-auto flex items-center justify-center rounded-full border-2 border-gray-input px-3 py-2.5">
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