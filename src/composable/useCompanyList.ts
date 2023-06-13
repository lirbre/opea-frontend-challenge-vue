import { CompanyAPI } from './company'
import { CompanyStore } from './stores/CompanyStore'

export const useCompanyList = () => {
  const fetchData = async (search?: string) => {
    fetch(
      `https://homolog.planetasec.com.br/prova/front/api/clients${
        search ? '?text=' + search : ''
      }`
    ).then(async (res) => {
      const data = await res.json()

      const parsed = CompanyAPI.safeParse(data)

      CompanyStore.company = parsed.success ? parsed.data : []
      CompanyStore.loading = false
    })
  }

  const refetchData = async (search?: string) => {
    fetch(
      `https://homolog.planetasec.com.br/prova/front/api/clients${
        search ? '?text=' + search : ''
      }`
    ).then(async (res) => {
      const data = await res.json()

      const parsed = CompanyAPI.safeParse(data)

      CompanyStore.company = parsed.success ? parsed.data : []
    })
  }

  return { fetchData, refetchData }
}
