import React from 'react'
import { Button } from '@mui/material'
import Discounts from './Discounts'
import { completeOrder } from '../../../services/order.service'
import { useNavigate } from 'react-router-dom'

export default function OrderSummary(props) {
  const navigate = useNavigate()

  const handleCompleteOrder = () => {
    const data = {
      addressID: props.billingAddress._id,
      token: localStorage.getItem('token'),
    }
    completeOrder(data)
      .then((res) => navigate(`/order/${res.data.message._id}`))
      .catch((e) => console.log(e))
  }

  return (
    <>
      <h1 className="text-xl font-semibold">Order Summary</h1>
      {!props.checkout && (
        <div className="mt-4">
          <Discounts />
        </div>
      )}

      <div className="flex flex-col border-t-[1px] border-solid border-gray-300 mt-6 text-sm">
        <div className="flex justify-between mt-4">
          <p>Sub Total</p>
          <p>{props.totalValue == 0 ? '-' : `{$ ${props.totalValue}}`}</p>
        </div>
        <div className="flex justify-between mt-2">
          <p>Discount</p>
          <p>-</p>
        </div>
        <div className="flex justify-between mt-2">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="border-t-[1px] border-solid border-black flex justify-between mt-4 pt-2 text-lg">
          <p className="">Total</p>
          <p>{props.totalValue == 0 ? '-' : `{$ ${props.totalValue}}`}</p>
        </div>
      </div>

      {props.checkout ? (
        <Button
          variant="contained"
          className="w-full h-10 mt-4"
          onClick={handleCompleteOrder}
        >
          Complete Order
        </Button>
      ) : (
        <div>
          <Button
            href="/checkout"
            variant="contained"
            className="w-full h-10 mt-6"
          >
            Continue to check out
          </Button>
          <p className="text-red-500 text-xs text-center mt-2">
            Free shipping on all orders!
          </p>
        </div>
      )}

      <div className="text-[0.6rem] mt-6">
        <p>
          30-day returns. Read more about our{' '}
          <span className="cursor-pointer underline">
            return and refund policy.
          </span>
        </p>
      </div>
    </>
  )
}
