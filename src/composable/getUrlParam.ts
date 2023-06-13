export function getUrlParams(urlSearch: string): { [key: string]: string } {
  const searchParams = new URLSearchParams(urlSearch)
  const params: { [key: string]: string } = {}

  for (const [key, value] of searchParams) {
    params[key] = value
  }

  return params
}
