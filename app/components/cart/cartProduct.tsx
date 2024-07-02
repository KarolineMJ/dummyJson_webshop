import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { IconButton, Typography, TextField, Stack, Button } from '@mui/material'
import Image from 'next/image'
import { useContext } from 'react'
import { CartContext, CartContextType } from '../../context/cart'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { ProductType } from '../products/productList'

export function CartProduct({ product }: { product: ProductType }) {
  const { addToCart, removeFromCart } = useContext<CartContextType>(CartContext)

  return (
    <Stack
      direction="row"
      gap={4}
      paddingBottom={3}
      marginBottom={3}
      justifyContent="space-between"
      sx={{
        borderBottom: '1px solid #ededed',
      }}
    >
      <Image
        alt={product.title}
        width={70}
        height={70}
        src={product.thumbnail}
        style={{
          backgroundColor: '#ededed',
        }}
      />

      <Stack
        sx={{
          minWidth: '300px',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            margin: '10px 0',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '250px',
          }}
        >
          {product.title}
        </Typography>
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10px',
          }}
        >
          <Stack direction="row">
            <IconButton
              color="primary"
              aria-label="add to shopping cart"
              onClick={() => addToCart(product)}
            >
              <AddIcon fontSize="small" />
            </IconButton>
            <TextField
              id="outlined-basic"
              variant="outlined"
              disabled
              size="small"
              fullWidth={false}
              value={product.quantity}
              sx={{ textAlign: 'center', width: '50px' }}
            />

            <IconButton
              color="primary"
              aria-label="add to shopping cart"
              onClick={() => removeFromCart(product, 1)}
            >
              <RemoveIcon />
            </IconButton>
          </Stack>
          <Typography>$ {Math.round(product.total * 100) / 100}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="end">
          <Button
            size="small"
            variant="outlined"
            startIcon={<DeleteOutlineIcon />}
            onClick={() => {
              removeFromCart(product, product.quantity)
            }}
          >
            Remove
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}
