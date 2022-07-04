import React from 'react'
import { Button, Link } from '@mui/material'
import Discounts from './Discounts'

export default function OrderSummary(props) {
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
          <p>$ {props.totalValue}</p>
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
          <p>$ {props.totalValue}</p>
        </div>
      </div>

      {!props.checkout && (
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
