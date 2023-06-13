import { reactive } from 'vue'
import { CompanyType } from './company'

export const CompanyStore = reactive<{
  company: CompanyType[]
  loading: boolean
  search: string
  limit: number
}>({
    company: [],
    loading: true,
    search: '',
    limit: 12
})