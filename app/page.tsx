'use client'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './theme'
import ProductList from './components/products/productList'
import NavBar from './components/navBar'

import { CartProvider } from './context/cart'

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
