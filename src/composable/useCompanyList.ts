import { CompanyAPI, CompanyForm } from './company'
import { getUrlParams } from './getUrlParam'
import { CompanyStore } from './stores/CompanyStore'

export const useCompanyList = () => {
  const fetchData = async (search?: string) =>
    fetch(
      `https://homolog.planetasec.com.br/prova/front/api/clients${
        search ? '?text=' + search : ''
      }`
    ).then(async (res) => {
      const data = await res.json()

      const parsed = CompanyAPI.safeParse(data)

      CompanyStore.company = parsed.success ? parsed.data : []
      CompanyStore.loading = false

      return parsed.success ? parsed.data : []
    })

  const refetchData = async (search?: string) =>
    fetch(
      `https://homolog.planetasec.com.br/prova/front/api/clients${
        search ? '?text=' + search : ''
      }`
    ).then(async (res) => {
      const data = await res.json()

      const parsed = CompanyAPI.safeParse(data)

      CompanyStore.company = parsed.success ? parsed.data : []

      return parsed.success ? parsed.data : []
    })

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
      const { search } = getUrlParams(window.location.search)
      refetchData(search)
    }
  }

  const updateCompany = async ({
    body,
    id
  }: {
    body: Zod.infer<typeof CompanyForm>
    id: string
  }) => {
    try {
      await fetch('https://homolog.planetasec.com.br/prova/front/api/clients/' + id, {
        body: JSON.stringify({ ...body }),
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } catch (err) {
      console.log(err)
    } finally {
      const { search } = getUrlParams(window.location.search)
      refetchData(search)
    }
  }

  const deleteCompany = async (id: string) => {
    try {
      await fetch(
        'https://homolog.planetasec.com.br/prova/front/api/clients/' + id,
        {
          body: JSON.stringify({ id }),
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    } catch (err) {
      console.log(err)
    } finally {
      const { search } = getUrlParams(window.location.search)
      refetchData(search)
    }
  }

  return { fetchData, refetchData, createCompany, deleteCompany, updateCompany }
}
