'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'

import { getURL } from '@/app/utils'
import { Grid, InputBase, Paper, Stack, TablePagination } from '@mui/material'
import { ProductDetailsDialog } from '@/app/productDetailsDialog'
import Product from '@/app/product'
import SearchIcon from '@mui/icons-material/Search'

export type ProductType = {
  id: number
  title: string
  category: string
  description: string
  stock: number
  price: number
  discountPercentage: number
  thumbnail: string
  images: [string]
  rating: number
  quantity: number
  total: number
}

export default function ProductList() {
  const [productList, setProductList] = useState([])
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null,
  )
  const [productDetailsOpen, setProductDetailsOpen] = useState(false)
  const [productsCount, setProductsCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [productsPerPage, setProductsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')

  const closeProductDetailsDialog = () => {
    setProductDetailsOpen(false)
    setSelectedProduct(null)
  }

  const changePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setCurrentPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setProductsPerPage(parseInt(event.target.value, 10))
    setCurrentPage(0)
  }

  const onSearchInputChange = (searchString: string) => {
    setSearchTerm(searchString)
    setCurrentPage(0)
  }

  useEffect(() => {
    const getAllProductList = async () => {
      const response = await axios.get(
        getURL({ currentPage, productsPerPage, searchTerm }),
      )
      setProductList(response.data.products)
      setProductsCount(response.data.total)
    }

    getAllProductList()
  }, [currentPage, productsPerPage, searchTerm])

  return (
    <Stack padding={2}>
      <Paper
        component="form"
        sx={{
          p: '4px 12px',
          display: 'flex',
          alignItems: 'center',
          width: 400,
        }}
      >
        <SearchIcon />
        <InputBase
          onChange={(e) => onSearchInputChange(e.target.value)}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search..."
        />
      </Paper>
      <Grid container spacing={2} paddingY={2}>
        {productList.length > 0 &&
          productList.map((product: ProductType, index) => {
            return (
              <Product
                key={index}
                product={product}
                setOpen={setProductDetailsOpen}
                setSelectedProduct={setSelectedProduct}
              />
            )
          })}
        {selectedProduct && (
          <ProductDetailsDialog
            selectedProduct={selectedProduct}
            open={productDetailsOpen}
            onClose={closeProductDetailsDialog}
          />
        )}
      </Grid>
      <Stack justifyContent="center" alignItems="center" marginY={4}>
        {productsCount > 0 && (
          <table>
            <tbody>
              <tr>
                <TablePagination
                  count={productsCount}
                  page={currentPage}
                  onPageChange={changePage}
                  rowsPerPage={productsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </tr>
            </tbody>
          </table>
        )}
      </Stack>
    </Stack>
  )
}
