<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { CompanyForm } from '../../composable/company'
import { ModalStore } from '../../composable/stores/ModalStore'
import useForm from '../../composable/useForm'

const router = useRouter()
const currentRoute = useRoute()

const { errors, submitForm } = useForm(CompanyForm, () => {})

const open = computed(() => ModalStore.create)

const handleSubmit = (e: Event) => {
  e.preventDefault()
  submitForm({
    cnpj: '',
    email: '',
    name: ''
  })
}

const clearCreate = () => {
  if (!ModalStore.create) return

  let updatedQuery = { ...currentRoute.query }

  ModalStore.create = false
  delete updatedQuery.create

  const updatedRoute = { ...currentRoute, query: updatedQuery }

  router.replace(updatedRoute)
}
</script>

<template>
  <div
    v-if="open"
    :data-open="'create ' + open"
    className="fixed bottom-1/2 right-1/2 flex h-screen w-screen translate-x-1/2 translate-y-1/2 cursor-pointer items-center justify-center backdrop-blur-sm"
    @click="clearCreate"
  ></div>
  <form
    @submit="handleSubmit"
    v-if="open"
    :data-open="'create ' + open"
    className="min-h-1/2 fixed bottom-1/2 right-1/2 z-10 flex w-11/12 translate-x-1/2 translate-y-1/2 cursor-default flex-col justify-between gap-4 rounded-opea bg-white pb-6 drop-shadow-md lg:w-1/4"
  >
    <div
      className="flex h-10 w-full items-center justify-between rounded-t-opea border-b-2 border-[#DDDDDD] py-2 pl-4 pr-3"
    >
      <p className="text-lg tracking-wide text-gray-text">Cadastrar Empresa</p>
      <button type="reset" aria-label="modal-close-icn">
        <img
          src="../../assets/images/close-icn.svg"
          width="20"
          height="20"
          alt="A close icon. An 'x' letter with a rounded border around it"
          className="cursor-pointer hover:opacity-80"
          @click="clearCreate"
        />
      </button>
    </div>
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1 px-6">
        <label htmlFor="company-name" className="text-wine-brand"> Nome </label>
        <input
          name="company-name"
          className="border-2 border-gray-input p-2"
          placeholder="Digite o nome"
        />
      </div>
      <span v-show="errors?.name" className="px-6 text-sm text-wine-brand">{{
        errors?.name
      }}</span>
      <div className="flex flex-col gap-1 px-6">
        <label htmlFor="company-cnpj" className="text-wine-brand"> CNPJ </label>
        <input
          name="company-cnpj"
          className="border-2 border-gray-input p-2"
          placeholder="Digite o CNPJ"
          maxlength="14"
        />
      </div>
      <span v-show="errors?.cnpj" className="px-6 text-sm text-wine-brand">{{
        errors?.cnpj
      }}</span>
      <div className="flex flex-col gap-1 px-6">
        <label htmlFor="company-email" className="text-wine-brand">
          E-mail
        </label>
        <input
          name="company-email"
          className="border-2 border-gray-input p-2"
          placeholder="Digite o e-mail"
        />
      </div>
      <span v-show="errors?.email" className="px-6 text-sm text-wine-brand">{{
        errors?.email
      }}</span>
    </div>
    <div className="flex items-center justify-end px-6">
      <div className="flex gap-4">
        <button
          type="reset"
          className="rounded-opea border-2 border-gray-input px-3 py-2 tracking-wide text-gray-helper hover:opacity-80"
          aria-label="modal-cancel"
          @click="clearCreate"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="rounded-opea border-2 border-transparent bg-wine-brand px-3 py-2 tracking-wide text-white transition-all duration-300 hover:border-wine-brand hover:bg-transparent hover:text-wine-brand"
          aria-label="modal-confirm"
        >
          Confirmar
        </button>
      </div>
    </div>
  </form>
</template>
