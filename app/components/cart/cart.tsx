import { IconButton, Typography, Popover, Stack } from '@mui/material'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import { useState, useContext, useEffect } from 'react'
import { CartContext, CartContextType } from '../../context/cart'
import { CartProduct } from './cartProduct'

export default function Cart() {
  const [totalProducts, setTotalProducts] = useState(0)
  const { cartItems, getCartTotal } = useContext<CartContextType>(CartContext)

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  useEffect(() => {
    setTotalProducts(cartItems.totalProducts)
  }, [cartItems])

  return (
    <Stack position="relative">
      {totalProducts > 0 && (
        <Typography
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            padding: '0 4px',
            backgroundColor: '#ff6900',
            textAlign: 'center',
            borderRadius: '50%',
            fontSize: 10,
            justifyContent: 'center',
            color: 'white',
          }}
        >
          {totalProducts}
        </Typography>
      )}
      <IconButton aria-label="add to shopping cart" onClick={handleClick}>
        <ShoppingBasketIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Stack sx={{ padding: '20px' }}>
          {cartItems?.products?.length > 0 ? (
            cartItems?.products.map((product, index) => {
              return <CartProduct key={index} product={product} />
            })
          ) : (
            <Stack
              sx={{
                paddingBottom: '20px',
                borderBottom: '1px solid #ededed',
                marginBottom: '20px',
              }}
            >
              <Typography>{`There's no products in your cart`}</Typography>
            </Stack>
          )}
          <Stack direction="row" justifyContent="space-between">
            <Typography>Total:</Typography>
            <Typography sx={{ fontWeight: 'bold' }}>
              $ {getCartTotal()}
            </Typography>
          </Stack>
        </Stack>
      </Popover>
    </Stack>
  )
}
