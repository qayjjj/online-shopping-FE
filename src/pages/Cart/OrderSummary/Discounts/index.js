import { Clear } from '@mui/icons-material'
import { Dialog, Card, TextField, Button } from '@mui/material'
import React, { useState } from 'react'

export default function Discounts() {
  const [openDialog, setOpenDialog] = useState(false)
  return (
    <div className="flex justify-between text-sm">
      <p>Discounts</p>
      <p
        className="underline cursor-pointer"
        onClick={() => setOpenDialog(true)}
      >
        Apply discounts
      </p>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <Card className="px-10 py-8">
          <h1 className="text-center text-2xl">Discounts</h1>
          <Clear
            className="absolute right-2 top-2 text-gray-500 cursor-pointer"
            onClick={() => setOpenDialog(false)}
          />
          <p className="mt-6 text-sm">Add a discount code</p>
          <div className="flex w-full mt-3">
            <TextField className="grow"></TextField>
            <Button variant="contained" className="ml-2 w-20">
              Add
            </Button>
          </div>
          <Button variant="contained" className="mt-6 w-full h-14">
            Apply
          </Button>
        </Card>
      </Dialog>
    </div>
  )
}
