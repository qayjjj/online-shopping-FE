import { Skeleton, Card, Grid } from '@mui/material'
import React from 'react'

export default function CheckoutSkeleton() {
  return (
    <Grid container spacing={2} className="h-[30rem] mt-6">
      <Grid item md={8}>
        <Card className="px-8 py-6">
          <div className="flex items-center">
            <Skeleton variant="text" animation="wave" className="w-32 h-8" />
            <Skeleton
              variant="text"
              animation="wave"
              className="w-12 h-8 ml-2"
            />
          </div>
          <Skeleton variant="text" animation="wave" className="w-56 h-8" />

          <div className="flex items-center">
            <div className="grow">
              <Skeleton variant="text" animation="wave" className="w-24 h-8" />
            </div>
            <Skeleton variant="text" animation="wave" className="w-14 h-10" />
            <Skeleton
              variant="text"
              animation="wave"
              className="w-32 h-10 ml-2"
            />
          </div>
        </Card>
      </Grid>
      <Grid item md={4}>
        <Card className="px-10 py-6">
          <h1 className="text-xl font-semibold">Order Summary</h1>

          <div className="flex flex-col border-t-[1px] border-solid border-gray-300 mt-6 text-sm">
            <div className="flex justify-between mt-4">
              <p>Order value</p>
              <Skeleton variant="text" className="w-12" />
            </div>
            <div className="flex justify-between mt-2">
              <p>Discount</p>
              <Skeleton variant="text" className="w-12" />
            </div>
            <div className="flex justify-between mt-2">
              <p>Shipping</p>
              <p>Free</p>
            </div>
            <div className="border-t-[1px] border-solid border-black flex justify-between mt-4 pt-2 text-lg">
              <p className="">Total</p>
              <Skeleton variant="text" className="w-12" />
            </div>
          </div>

          <div className="text-[0.6rem] mt-6">
            <p>
              30-day returns. Read more about our{' '}
              <span className="cursor-pointer underline">
                return and refund policy.
              </span>
            </p>
          </div>
        </Card>
      </Grid>
    </Grid>
  )
}
