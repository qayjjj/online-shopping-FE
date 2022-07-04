import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Badge, Popover } from '@mui/material'
import { ShoppingCart } from '@mui/icons-material'

export default function DetailsNavbar(props) {
  const navigate = useNavigate()

  return (
    <div className="relative">
      <h1 className="text-3xl font-semibold">Product Details</h1>
      <div className="absolute -top-10 right-0">
        <Button onClick={() => navigate('/dashboard')}>Dashboard</Button>
        <Button className="ml-2" onClick={() => navigate('/cart')}>
          <Badge badgeContent={props.cartNumber} color="primary">
            <ShoppingCart className="text-black" />
          </Badge>
        </Button>
      </div>
    </div>
  )
}
