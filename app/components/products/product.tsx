'use client'

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import { ProductType } from './productList'
import { Dispatch, SetStateAction, useContext, useState } from 'react'
import { CartContext } from '../../context/cart'

export default function ProductList({
  product,
  setOpen,
  setSelectedProduct,
}: {
  product: ProductType
  setOpen: Dispatch<SetStateAction<boolean>>
  setSelectedProduct: Dispatch<SetStateAction<ProductType | null>>
}) {
  const [snackBarOpen, setSnackBarOpen] = useState(false)

  const { addToCart } = useContext(CartContext)
  const outOfStock = product.stock === 0

  const openProductDetailsDialog = (product: ProductType) => {
    setOpen(true)
    setSelectedProduct(product)
  }

  return (
    <Grid item xs={16} sm={6} md={4} xl={2}>
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
            <Typography variant="caption">{product.stock} pc</Typography>
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
              addToCart(product)
              setSnackBarOpen(true)
            }}
          >
            <ShoppingBasketIcon />
          </IconButton>
        </CardActions>
      </Card>

      <Snackbar
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackBarOpen}
        onClose={() => setSnackBarOpen(false)}
        message="Item succesfully added to cart"
      />
    </Grid>
  )
}
