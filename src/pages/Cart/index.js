import { Card, Grid } from '@mui/material'
import Navigation from 'components/Navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { getTotalCartValue, viewCart } from 'services/cart.service'
import OrderSummary from './OrderSummary'
import OrderTable from './OrderTable'
import CartSkeleton from './Skeleton'

export default function Cart() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [items, setItems] = useState([])
  const [totalValue, setTotalValue] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const handleViewCart = () => {
    const token = localStorage.getItem('token')
    setIsLoading(true)
    viewCart({ token })
      .then((res) => setItems(res.data.message))
      .then(() =>
        getTotalCartValue({
          token: localStorage.getItem('token'),
        }).then((res) => setTotalValue(res.data.message)),
      )
      .then(() => setIsLoading(false))
      .catch((e) => {
        setIsLoading(false)
        enqueueSnackbar("Something's wrong", {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          autoHideDuration: 2000,
        })
      })
  }

  useEffect(() => handleViewCart(), [])

  return (
    <>
      <Navigation />
      <div className="px-32 py-20">
        <h1 className="text-3xl font-semibold">Cart</h1>

        {isLoading ? (
          <CartSkeleton />
        ) : (
          <Grid container spacing={2} className="h-[30rem] mt-6">
            <Grid item md={8}>
              <OrderTable items={items} handleViewCart={handleViewCart} />
            </Grid>
            <Grid item md={4}>
              <Card className="px-10 py-6">
                <OrderSummary totalValue={totalValue} />
              </Card>
            </Grid>
          </Grid>
        )}
      </div>
    </>
  )
}
