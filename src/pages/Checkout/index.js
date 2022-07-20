import { Grid, Button, Card } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import OrderSummary from '../Cart/OrderSummary'
import { getTotalCartValue } from 'services/cart.service'
import { useSnackbar } from 'notistack'
import { viewAddresses } from 'services/address.service'
import CheckoutSkeleton from './Skeleton'
import Addresses from './Addresses'
import BillingAddress from './Billing Address'

export default function Checkout() {
  const navigate = useNavigate()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [isLoading, setIsLoading] = useState(false)
  const [totalValue, setTotalValue] = useState(0)
  const [addresses, setAddresses] = useState([])
  const [destination, setDestination] = useState({})

  const handleLogOut = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  const handleCheckout = () => {
    const token = localStorage.getItem('token')
    setIsLoading(true)
    getTotalCartValue({ token })
      .then((res) => {
        setTotalValue(res.data.message)
        handleListAddresses()
      })
      .catch((e) => {
        setIsLoading(false)
        enqueueSnackbar('Something is wrong', {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          autoHideDuration: 2000,
        })
      })
  }

  const handleSortAddresses = (data) => {
    data.sort((a, b) => b.defaultAddress - a.defaultAddress)
    setDestination(data[0])
    setAddresses(data)
  }

  const handleListAddresses = () => {
    const token = localStorage.getItem('token')
    viewAddresses({ token })
      .then((res) => {
        handleSortAddresses(res.data.message)
        setIsLoading(false)
      })
      .catch((e) => {
        enqueueSnackbar("Can't fetch addresses", {
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
      {isLoading ? (
        <CheckoutSkeleton />
      ) : (
        <Grid container spacing={2} className="h-[30rem] mt-4">
          <Grid item md={8}>
            <Addresses
              addresses={addresses}
              handleListAddresses={handleListAddresses}
              destination={destination}
              setDestination={setDestination}
            />
          </Grid>
          <Grid item md={4}>
            {destination && <BillingAddress destination={destination} />}
            <Card className="px-10 py-6">
              <OrderSummary
                totalValue={totalValue}
                checkout={true}
                billingAddress={destination}
              />
            </Card>
          </Grid>
        </Grid>
      )}
    </div>
  )
}
