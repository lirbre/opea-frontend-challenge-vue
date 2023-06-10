<script lang="ts" setup>
import Pagination from './Pagination.vue'
import Searchbar from './Searchbar.vue'
</script>

<template>
  <div
    className="mx-auto flex w-full max-w-[1980px] items-center justify-between gap-4 px-8 pt-8"
  >
    <Pagination />
    <Searchbar />
  </div>
</template>
