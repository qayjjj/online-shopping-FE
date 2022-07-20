import React, { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  Card,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material'
import { Edit } from '@mui/icons-material'
import AddressForm from './AddressForm'
import { deleteAddress } from 'services/address.service'
import { useSnackbar } from 'notistack'

export default function Addresses(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [addressID, setAddressID] = useState('')
  const [formValues, setFormValues] = useState('')

  const handleShowAddressForm = (option, values) => {
    setIsEdit(option)
    setFormValues(values)
    setShowAddressForm(true)
  }

  const handleDeleteAddress = () => {
    const data = {
      addressID,
      token: localStorage.getItem('token'),
    }
    deleteAddress(data)
      .then((res) => {
        enqueueSnackbar('Address deleted successfully', {
          variant: 'success',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          autoHideDuration: 2000,
        })
        setShowDeleteDialog(false)
        props.handleListAddresses()
      })
      .catch((e) =>
        enqueueSnackbar(e?.response?.data || "Something's wrong", {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          autoHideDuration: 2000,
        }),
      )
  }

  return (
    <div>
      {props.addresses.map((item) => (
        <Card className="px-8 py-6">
          <div className="flex items-center">
            <h1 className="text-xl">{item.name}</h1>
            <span className="text-gray-500 ml-2">({item.addressType})</span>
            {item.defaultAddress && (
              <div className="text-xs ml-3 bg-[#6c63ff] text-white px-1 py-[0.15rem] rounded-md">
                Default
              </div>
            )}
            <div className="grow grid justify-items-end">
              <Edit
                className="h-5 cursor-pointer"
                onClick={() => handleShowAddressForm(true, item)}
              />
            </div>
          </div>
          <h1 className="text-sm mt-2">
            {item.address} - {item.city}, {item.state}, {item.country} /{' '}
            {item.zipCode}
          </h1>

          <div className="flex items-center mt-2">
            <h1 className="grow text-sm text-gray-500">{item.phoneNumber}</h1>
            <Button
              className="normal-case text-black border-gray-300 hover:text-[#6c63ff] px-1 py-1 rounded-lg text-sm font-medium"
              variant="outlined"
              onClick={() => {
                setShowDeleteDialog(true)
                setAddressID(item._id)
              }}
            >
              Delete
            </Button>
            {item !== props.destination && (
              <Button
                color="success"
                className="normal-case px-2 py-1 rounded-lg text-sm font-medium ml-2"
                variant="outlined"
                onClick={() => props.setDestination(item)}
              >
                Deliver to this address
              </Button>
            )}
          </div>
        </Card>
      ))}
      <div className="grid justify-items-end">
        <Button className="mt-4" onClick={() => handleShowAddressForm(false)}>
          <span className="text-2xl mb-1">+</span>
          <span className="ml-2">Add New Address</span>
        </Button>
      </div>

      <AddressForm
        showAddressForm={showAddressForm}
        setShowAddressForm={setShowAddressForm}
        handleListAddresses={props.handleListAddresses}
        edit={isEdit}
        formValues={formValues}
      />

      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      >
        <DialogTitle>Delete this address?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You won't be able to retrieve this address.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteAddress} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
