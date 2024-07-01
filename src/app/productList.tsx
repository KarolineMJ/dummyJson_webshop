'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'

import { getURL } from '@/app/utils'
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import { ProductDetailsDialog } from '@/app/productDetailsDialog'

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
  const [open, setOpen] = useState(false)

  const openProductDetailsDialog = (product: ProductType) => {
    setOpen(true)
    setSelectedProduct(product)
  }
  const closeProductDetailsDialog = () => {
    setOpen(false)
    setSelectedProduct(null)
  }

  useEffect(() => {
    const getAllProductList = async () => {
      const response = await axios.get(getURL())
      setProductList(response.data.products)
    }
    getAllProductList()
  }, [])

  return (
    <Grid container spacing={2} padding={2}>
      {productList.length > 0 &&
        productList.map((product: ProductType, index) => {
          const outOfStock = product.stock === 0

          return (
            <Grid item key={index} xs={8} sm={6} md={4} xl={2}>
              <Card
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  openProductDetailsDialog(product)
                }}
              >
                <Stack sx={{ position: 'relative' }}>
                  <CardMedia
                    image={product.thumbnail}
                    sx={{
                      height: 200,
                      filter: outOfStock ? 'grayscale(0.9)' : 'grayscale(0)',
                      opacity: outOfStock ? 0.3 : 1,
                    }}
                  />
                  {outOfStock && (
                    <Typography
                      sx={{
                        position: 'absolute',
                        zIndex: 2,
                        fontWeight: 'bold',
                        top: 0,
                        bottom: 0,
                        alignSelf: 'center',
                      }}
                    >
                      Out of stock
                    </Typography>
                  )}
                </Stack>
                <CardContent>
                  <Typography
                    variant="body1"
                    sx={{
                      margin: '10px 0',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {product.title}
                  </Typography>
                  <Stack direction="row" alignItems="center" gap={0.5}>
                    <CheckIcon
                      sx={{
                        color: product.stock < 5 ? '#c1a036 ' : '#7ac136 ',
                      }}
                    />
                    <Typography variant="caption">
                      {product.stock} pc
                    </Typography>
                  </Stack>
                </CardContent>
                <CardActions
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography style={{ fontWeight: 'bold' }}>
                    $ {product.price}
                  </Typography>

                  <IconButton
                    disabled={outOfStock}
                    color="primary"
                    aria-label="add to shopping cart"
                    onClick={(e) => {
                      e.stopPropagation()
                      console.log('wuhuuu added to cart')
                    }}
                  >
                    <ShoppingBasketIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          )
        })}
      {selectedProduct && (
        <ProductDetailsDialog
          selectedProduct={selectedProduct}
          open={open}
          onClose={closeProductDetailsDialog}
        />
      )}
    </Grid>
  )
}
