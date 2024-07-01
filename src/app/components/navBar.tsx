import Cart from '@/app/components/cart/cart'
import { Stack, Typography } from '@mui/material'

export default function NavBar() {
  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: '20px 20px',
        borderBottom: '2px solid #ededed',
      }}
    >
      <Typography variant="h1">EVERYTHING YOU NEED</Typography>
      <Cart />
    </Stack>
  )
}
