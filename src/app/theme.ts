import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  typography: {
    h1: {
      fontSize: 30,
    },
    h2: {
      fontSize: 28,
    },
  },
  palette: {
    background: {
      default: '#f4f4f4',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexDirection: 'column',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '8px 16px',
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: '8px 16px',
        },
      },
    },
  },
})
