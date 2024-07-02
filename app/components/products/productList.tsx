'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'

import { getURL } from './productsUtils'
import {
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  Stack,
  TablePagination,
  Typography,
} from '@mui/material'
import { ProductDetailsDialog } from './productDetailsDialog'
import Product from './product'
import SearchIcon from '@mui/icons-material/Search'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import { SideBar } from '../sideBar'

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
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)
  const [productsPerPage, setProductsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<string>('title')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [category, setCategory] = useState<string>('')

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
      setIsLoading(true)
      const response = await axios.get(
        getURL({
          currentPage,
          productsPerPage,
          searchTerm,
          sortBy,
          sortOrder,
          category,
        }),
      )
      setProductList(response.data.products)
      setIsLoading(false)
      setProductsCount(response.data.total)
    }

    getAllProductList()
  }, [currentPage, productsPerPage, searchTerm, sortBy, sortOrder, category])

  return (
    <Stack direction="row" sx={{ paddingTop: '80px' }}>
      <SideBar setCategory={setCategory} category={category} />
      <Stack padding={2}>
        <Stack
          minWidth="100%"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {category === '' ? (
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
          ) : (
            <Typography>
              <b>Category:</b> {category}
            </Typography>
          )}
          <Stack gap={2} alignItems="center" direction="row">
            <Typography>
              <b>Sort by:</b>
            </Typography>
            <Select
              id="sortBy"
              value={sortBy}
              onChange={(event) => {
                setCurrentPage(0)
                setSortBy(event.target.value)
              }}
              size="small"
              sx={{ backgroundColor: 'white', padding: '0 10px' }}
            >
              <MenuItem value={'title'}>Title</MenuItem>
              <MenuItem value={'price'}>Price</MenuItem>
              <MenuItem value={'brand'}>Brand</MenuItem>
            </Select>
            <Stack direction="row" alignItems="center">
              <IconButton
                aria-label="add to shopping cart"
                onClick={() =>
                  setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')
                }
              >
                <SwapVertIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
        {isLoading ? (
          <Grid container spacing={2} paddingY={2}>
            {Array(12)
              .fill(1)
              .map((_, index) => (
                <Grid key={index} item xs={16} sm={6} md={4} xl={2}>
                  <Skeleton variant="rectangular" width={200} height={315} />
                </Grid>
              ))}
          </Grid>
        ) : (
          <>
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
          </>
        )}
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
    </Stack>
  )
}
