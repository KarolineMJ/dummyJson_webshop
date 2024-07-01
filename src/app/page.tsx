'use client'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from '@/app/theme'
import ProductList from '@/app/productList'

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProductList />
    </ThemeProvider>
  )
}
