import { Card } from '@mui/material'
import React from 'react'

function BillingAddress(props) {
  return (
    <Card className="px-10 py-6 mb-3">
      <h1 className="text-xl font-semibold">Billing Address</h1>
      <div className="flex mt-3">
        <h1 className="font-medium text-sm">{props.destination.name}</h1>
        <h1 className="text-gray-500 text-sm ml-1">
          ({props.destination.addressType})
        </h1>
      </div>
      <p className="text-sm mt-2">
        {props.destination.address} - {props.destination.city},{' '}
        {props.destination.state}, {props.destination.country} /{' '}
        {props.destination.zipCode}
      </p>
      <p className="text-sm mt-2">{props.destination.phoneNumber}</p>
    </Card>
  )
}

export default BillingAddress
