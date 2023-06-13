<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { maskCnpj } from '../composable/maskCnpj'
import { CompanyAPI } from '../composable/company'
import { ModalStore } from '../composable/stores/ModalStore'
import { onMounted } from 'vue'
import { getUrlParams } from '../composable/getUrlParam'
import { CompanyStore } from '../composable/stores/CompanyStore'

const props = defineProps<{
  company: Zod.infer<typeof CompanyAPI>[number]
}>()

const router = useRouter()
const currentRoute = useRoute()

const { edit: initialEdit } = getUrlParams(window.location.search)

const handleEdit = () => {
  let updatedQuery = { ...currentRoute.query }

  if (!ModalStore.edit) {
    ModalStore.edit = true
    updatedQuery.edit = props.company.id
    CompanyStore.selectedCompany = CompanyStore.company.filter(
      (item) => item.id === props.company.id
    )
  } else {
    ModalStore.edit = false
    delete updatedQuery.edit
  }

  const updatedRoute = { ...currentRoute, query: updatedQuery }

  router.replace(updatedRoute)
}

onMounted(() => {
  ModalStore.edit = Boolean(initialEdit)
})
</script>

<template>
  <button
    :name="'Edit ' + company.name + ' button'"
    :aria-label="'Edit ' + company.name + ' button'"
    className="flex h-20 w-full items-center gap-6 rounded-l-full border-2 border-transparent bg-white p-2 shadow-sm hover:opacity-80"
    @click="handleEdit"
  >
    <div
      className="flex items-center justify-center rounded-full border-2 border-gray-input px-3 py-2.5"
    >
      <img
        src="../assets/images/clipboard-list-icn.svg"
        width="14"
        height="20"
        alt="A gray clipboard icon"
      />
    </div>
    <div className="text-left text-gray-font">
      <p className="text-lg">{{ company.name }}</p>
      <p className="hidden lg:block">
        CNPJ: {{ maskCnpj(company.cnpj) }} - Email:
        <span className="text-sm">{{ company.email }}</span>
      </p>
      <p className="block text-sm lg:hidden">
        CNPJ: {{ maskCnpj(company.cnpj) }}
      </p>
      <p className="block text-sm lg:hidden">
        Email: <span className="text-sm">{{ company.email }}</span>
      </p>
    </div>
  </button>
</template>
