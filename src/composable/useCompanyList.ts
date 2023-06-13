import { CompanyAPI, CompanyForm } from './company'
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

  const createCompany = async (body: Zod.infer<typeof CompanyForm>) => {
    try {
      await fetch('https://homolog.planetasec.com.br/prova/front/api/clients', {
        body: JSON.stringify({ ...body }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } catch (err) {
      console.log(err)
    } finally {
      refetchData()
    }
  }

  return { fetchData, refetchData, createCompany }
}
