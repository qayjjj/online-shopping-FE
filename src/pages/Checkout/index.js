import { Grid, Button, Card } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import OrderSummary from '../Cart/OrderSummary'
import AddAddressForm from './AddAddressForm'
import { getTotalCartValue } from '../../services/cart.service'
import { useSnackbar } from 'notistack'

export default function Checkout() {
  const navigate = useNavigate()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [isLoading, setIsLoading] = useState(false)
  const [totalValue, setTotalValue] = useState(0)

  const handleLogOut = () => {
    localStorage.removeItem('token')
    // navigate('/login')
  }

  const handleCheckout = () => {
    const token = localStorage.getItem('token')
    setIsLoading(true)
    getTotalCartValue({ token })
      .then((res) => setTotalValue(res.data.message))
      .then(() => setIsLoading(false))
      .catch((e) => {
        setIsLoading(false)
        enqueueSnackbar('Something is wrong', {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          autoHideDuration: 2000,
        })
      })
  }

  useEffect(() => handleCheckout(), [])

  return (
    <div className="px-32 py-24">
      <div className="relative">
        <h1 className="text-3xl font-semibold">Checkout</h1>
        <Button className="absolute -top-10 right-0" onClick={handleLogOut}>
          Log Out
        </Button>
      </div>
      <Grid container spacing={2} className="h-[30rem] mt-6">
        <Grid item md={8}>
          <AddAddressForm />
        </Grid>
        <Grid item md={4}>
          <Card className="px-10 py-6">
            <OrderSummary totalValue={totalValue} checkout={true} />
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}
