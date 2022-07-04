import React from 'react'
import { Card, Skeleton, Grid } from '@mui/material'

export default function DetailsSkeleton() {
  return (
    <Card className="mt-8 h-[32rem]">
      <Grid container className="h-full">
        <Grid item md={6}>
          <div className="h-full">
            <Skeleton variant="rectangular" className="h-full w-full" />
          </div>
        </Grid>
        <Grid item md={6}>
          <div className="flex flex-col px-20 py-10">
            <Skeleton variant="text" animation="wave" className="w-56 h-14" />
            <Skeleton variant="text" animation="wave" className="w-32 h-10" />
            <Skeleton
              variant="text"
              animation="wave"
              className="mt-4 w-32 h-8"
            />
            <Skeleton variant="text" animation="wave" className="h-72 h-20" />
            <div className="flex justify-between mt-3">
              <Skeleton variant="text" animation="wave" className="w-28 h-10" />
              <Skeleton variant="text" animation="wave" className="w-28 h-10" />
            </div>
            <div className="flex w-full justify-between mt-6 border-t-2 border-dashed border-gray-200 pt-5">
              <Skeleton variant="text" animation="wave" className="w-44 h-24" />
              <Skeleton variant="text" animation="wave" className="w-44 h-24" />
            </div>
          </div>
        </Grid>
      </Grid>
    </Card>
  )
}
