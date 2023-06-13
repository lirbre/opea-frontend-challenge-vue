export const maskCnpj = (document: string) => {
    if (!document) return ''
    let value = document.replace(/\D/g, '')
  
    value = value.replace(/^(\d{2})(\d)/, '$1.$2')
    value = value.replace(/^(\d{2}).(\d{3})(\d)/, '$1.$2.$3')
    value = value.replace(/.(\d{3})(\d)/, '.$1/$2')
    value = value.replace(/(\d{4})(\d)/, '$1-$2')
  
    return value
}