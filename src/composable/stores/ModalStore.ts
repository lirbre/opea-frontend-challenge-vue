import { reactive } from 'vue'

export const ModalStore = reactive<{
  create: boolean
  edit: boolean
}>({
  create: false,
  edit: false
})
