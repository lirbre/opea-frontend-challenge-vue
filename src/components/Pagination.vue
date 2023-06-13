<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { CompanyStore } from '../composable/CompanyStore'
import { getUrlParams } from '../composable/getUrlParam'

const router = useRouter()
const currentRoute = useRoute()

const maxPages = ref(
  CompanyStore.loading
    ? 1
    : Math.ceil(CompanyStore.company.length / CompanyStore.limit)
)

const { page: initialPage } = getUrlParams(window.location.search)
const page = ref(Number(initialPage ?? 1))

const nextPage = () => {
  let updatedQuery = { ...currentRoute.query }

  if (page.value) {
    page.value++
    updatedQuery.page = String(page.value)
  } else {
    delete updatedQuery.page
  }
  const updatedRoute = { ...currentRoute, query: updatedQuery }

  router.replace(updatedRoute)
}

const previousPage = () => {
  let updatedQuery = { ...currentRoute.query }

  if (page.value - 1 !== 0) {
    page.value--
    updatedQuery.page = String(page.value)
  } else {
    delete updatedQuery.page
  }
  const updatedRoute = { ...currentRoute, query: updatedQuery }

  router.replace(updatedRoute)
}

// guarantes that nextPage always is lesser than maxPages onMounted
onMounted(() => {
  if (page.value < 1) {
    page.value = 1

    let updatedQuery = { ...currentRoute.query, page: maxPages.value }
    const updatedRoute = { ...currentRoute, query: updatedQuery }

    page.value = 1

    router.replace(updatedRoute)
  }

  if (page.value > maxPages.value) {
    let updatedQuery = { ...currentRoute.query, page: maxPages.value }
    const updatedRoute = { ...currentRoute, query: updatedQuery }

    page.value = maxPages.value

    router.replace(updatedRoute)
  }
})
</script>

<template>
  <div
    className="flex items-center justify-center gap-1.5 rounded-opea border-2 border-gray-input bg-white-brand p-0.5 px-2.5"
  >
    <button
      aria-label="Previous page"
      @click="previousPage"
      :disabled="page === 1"
      className="enabled:text-wine-brand enabled:hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
    >
      &#x2190;
    </button>
    <div
      className="h-8 w-10 px-3 py-1 text-center font-semibold hover:opacity-90"
    >
      {{ page }}
    </div>
    <button
      aria-label="Next page"
      @click="nextPage"
      :disabled="page === maxPages"
      className="enabled:text-wine-brand enabled:hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
    >
      &#x2192;
    </button>
  </div>
</template>
