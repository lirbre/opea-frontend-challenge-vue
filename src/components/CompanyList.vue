<script setup lang="ts">
import { onMounted } from 'vue'
import { CompanyStore } from '../composable/stores/CompanyStore'
import Company from './Company.vue'
import CompanyCreate from './CompanyCreate.vue'
import CompanyEmpty from './CompanyEmpty.vue'
import CompanyLoading from './CompanyLoading.vue'
import { useCompanyList } from '../composable/useCompanyList'
import { getUrlParams } from '../composable/getUrlParam'
import { ModalStore } from '../composable/stores/ModalStore'

const { fetchData } = useCompanyList()

const { search: initialSearch, edit } = getUrlParams(window.location.search)

onMounted(() =>
  fetchData(initialSearch).then((res) => {
    if (edit) {
      console.log('editing', edit)
      ModalStore.edit = true
      CompanyStore.selectedCompany = res.filter((item) => (item.id = edit))
    }
  })
)
</script>

<template>
  <div
    class="mx-auto flex w-full max-w-[1980px] flex-col gap-1.5 px-4 py-4 lg:px-8"
    v-show="CompanyStore.loading"
  >
    <CompanyCreate />
    <CompanyLoading />
  </div>
  <div
    class="mx-auto flex w-full max-w-[1980px] flex-col gap-1.5 px-4 py-4 lg:px-8"
    v-show="CompanyStore.company.length === 0 && !CompanyStore.loading"
  >
    <CompanyCreate />
    <CompanyEmpty />
  </div>
  <div
    class="mx-auto flex w-full max-w-[1980px] flex-col gap-1.5 px-4 py-4 lg:px-8"
    v-show="CompanyStore.company.length !== 0 && !CompanyStore.loading"
  >
    <CompanyCreate />
    <transition-group
      tag="ul"
      enter-active-class="duration-300 ease-out"
      enter-from-class="transform opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="transform opacity-0"
      class="flex w-full flex-col gap-1.5"
    >
      <Company
        v-for="company in CompanyStore.company"
        :key="company.id"
        :company="company"
      />
    </transition-group>
  </div>
</template>
