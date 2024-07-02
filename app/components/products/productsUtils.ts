export function getURL({
  currentPage,
  productsPerPage,
  searchTerm = '',
  category,
  sortBy,
  sortOrder,
}: {
  currentPage?: number
  productsPerPage?: number
  searchTerm?: string
  category?: string
  sortOrder?: 'asc' | 'desc'
  sortBy?: string
}) {
  let url = 'https://dummyjson.com/products'

  if (category) {
    url = url + `/category/${category}`
  }

  if (searchTerm) {
    url = url + `/search?q=${searchTerm}`
  }
  url = url + `${searchTerm ? '&' : '?'}limit=${productsPerPage}`

  if (sortBy) {
    url = url + `&sortBy=${sortBy}`
  }
  if (sortOrder) {
    url = url + `&order=${sortOrder}`
  }

  if (productsPerPage && currentPage && currentPage > 0) {
    url = url + `&skip=${currentPage * productsPerPage}`
  }

  return url
}
