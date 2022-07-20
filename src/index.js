import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import './index.css'
import App from './App'
import { SnackbarProvider } from 'notistack'

const theme = createTheme({
  palette: {
    primary: {
      main: '#6c63ff',
    },
  },
})

ReactDOM.render(
  <BrowserRouter>
    <SnackbarProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </SnackbarProvider>
  </BrowserRouter>,
  document.getElementById('root'),
)
