import { CompanyStore } from "./CompanyStore"

export const useCompanyList = () => {
   const fetchData = async (search?: string) => {
    fetch( `https://homolog.planetasec.com.br/prova/front/api/clients${
        search ? '?text=' + search : ''
      }`
    ).then(async (res) => {
      const data = await res.json()

      CompanyStore.company = data
      CompanyStore.loading = false
    })
   }

   const refetchData = async (search?: string) => {
    fetch( `https://homolog.planetasec.com.br/prova/front/api/clients${
        search ? '?text=' + search : ''
      }`
    ).then(async (res) => {
      const data = await res.json()

      CompanyStore.company = data
    })
   }

   return { fetchData, refetchData }
}   