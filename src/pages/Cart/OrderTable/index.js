import React from 'react'
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
} from '@mui/material'
import screenshot from '../../../assets/img/screenshot.png'
import { RemoveCircle, AddCircle, Delete } from '@mui/icons-material'
import { addToCart, removeFromCart } from '../../../services/cart.service'

export default function OrderTable(props) {
  const handleRemoveItem = (productID, option) => {
    const data = {
      token: localStorage.getItem('token'),
      productID,
      option,
    }
    removeFromCart(data)
      .then(() => props.handleViewCart())
      .catch((e) => console.log(e))
  }

  const handleAddItem = (productID) => {
    const data = {
      token: localStorage.getItem('token'),
      productID,
      quantity: 1,
    }
    addToCart(data)
      .then(() => props.handleViewCart())
      .catch((e) => console.log(e))
  }
  return (
    <Card>
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
            {props.items.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="flex items-center">
                  <div className="w-16 h-16 overflow-x-hidden rounded-md grid place-items-center">
                    <img src={item.image} className="h-full" />
                  </div>

                  <h1 className="ml-4">{item.name}</h1>
                </TableCell>
                <TableCell>$ {item.price}</TableCell>
                <TableCell>
                  <div className="flex">
                    <RemoveCircle
                      className="cursor-pointer"
                      onClick={() => handleRemoveItem(item._id, 1)}
                    />
                    <div className="w-1/3 text-center">{item.quantity}</div>
                    <AddCircle
                      className="cursor-pointer"
                      onClick={() => handleAddItem(item._id)}
                    />
                  </div>
                </TableCell>
                <TableCell>$ {item.price * item.quantity}</TableCell>
                <TableCell>
                  <Delete
                    className="cursor-pointer"
                    onClick={() => handleRemoveItem(item._id, 'all')}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
