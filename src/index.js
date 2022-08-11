import { createTheme, ThemeProvider } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

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
