import { reactive } from 'vue'
import { CompanyAPI } from '../company'

export const CompanyStore = reactive<{
  company: Zod.infer<typeof CompanyAPI>[number][]
  selectedCompany: Zod.infer<typeof CompanyAPI>[number][]
  loading: boolean
  search: string
  limit: number
}>({
  company: [],
  selectedCompany: [],
  loading: true,
  search: '',
  limit: 12
})
