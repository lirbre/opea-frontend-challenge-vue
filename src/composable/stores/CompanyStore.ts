import { reactive } from 'vue'
import { CompanyType } from '../company'

export const CompanyStore = reactive<{
  company: CompanyType[]
  selectedCompany: CompanyType[]
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
