'use client'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from '@/app/theme'
import ProductList from '@/app/components/products/productList'
import NavBar from '@/app/components/navBar'

import { CartProvider } from '@/app/context/cart'

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <NavBar />
        <ProductList />
      </CartProvider>
    </ThemeProvider>
  )
}
