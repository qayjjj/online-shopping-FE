import React from 'react'
import {
  Card,
  Button,
  Skeleton,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material'
import { Delete } from '@mui/icons-material'
import Discounts from '../OrderSummary/Discounts'

const listArraySkeleton = [1, 2, 3]

export default function CartSkeleton() {
  return (
    <Grid container spacing={2} className="h-[30rem] mt-6">
      <Grid item md={8}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell className="w-5/12">Product</TableCell>
                <TableCell className="w-2/12">Price</TableCell>
                <TableCell className="w-2/12">Quantity</TableCell>
                <TableCell className="w-2/12">Total Price</TableCell>
                <TableCell className="w-1/12"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listArraySkeleton.map((item) => (
                <TableRow key={item._id}>
                  <TableCell className="flex items-center">
                    <div className="w-16 h-16 overflow-x-hidden rounded-md grid place-items-center">
                      <Skeleton
                        className="w-full h-full"
                        variant="rectangular"
                      />
                    </div>
                    <Skeleton className="w-24 ml-4" variant="text" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-16" variant="text" />
                  </TableCell>
                  <TableCell>
                    <div className="flex">
                      <Skeleton className="w-24" variant="text" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-16" variant="text" />
                  </TableCell>
                  <TableCell>
                    <Delete />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item md={4}>
        <Card className="px-10 py-6">
          <h1 className="text-xl font-semibold">Order Summary</h1>
          <div className="mt-4">
            <Discounts />
          </div>
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

          <div>
            <Button variant="contained" disabled className="w-full h-10 mt-6">
              Continue to check out
            </Button>
            <p className="text-red-500 text-xs text-center mt-2">
              Free shipping on all orders!
            </p>
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
