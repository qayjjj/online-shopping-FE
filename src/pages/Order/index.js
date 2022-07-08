import React, { useEffect, useState } from 'react'
import { Card } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useParams } from 'react-router-dom'
import { getOrderDetails } from '../../services/order.service'
import shopping from '../../assets/img/shopping.svg'

export default function Order() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { orderID } = useParams()
  const [order, setOrder] = useState({})

  useEffect(() => {
    // setIsLoading(true)

    getOrderDetails({ orderID })
      .then((res) => {
        // setIsLoading(false)
        setOrder(res.data.message)
      })
      .catch(() =>
        enqueueSnackbar('Something is wrong', {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          autoHideDuration: 2000,
        }),
      )
  }, [])

  return (
    <div className="h-screen flex flex-col place-items-center py-20 ">
      <h1 className="text-3xl font-semibold">
        Thank you for shopping with us!
      </h1>
      <img src={shopping} className="w-1/3 mt-12" />

      <h1 className="text-xl font-semibold mt-16">Order ID: {orderID}</h1>

      <div className="w-1/3 text-center mt-4">
        <p className="text-gray-500">
          We will send you a notification when it is out for delivery. If you
          have any questions please don't hesitate to contact us.
        </p>
      </div>
    </div>
  )
}
