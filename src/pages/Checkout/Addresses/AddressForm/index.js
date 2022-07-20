import React, { useEffect, useState } from 'react'
import { Clear } from '@mui/icons-material'
import {
  Button,
  Dialog,
  Radio,
  TextField,
  Card,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  RadioGroup,
  FormHelperText,
  Checkbox,
} from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import countries from './countries'
import { addAddress, editAddress } from 'services/address.service'
import { useSnackbar } from 'notistack'

const validationSchema = yup.object().shape({
  userID: yup.string(),
  name: yup.string().required('Please enter name.'),
  phoneNumber: yup.string().required('Please enter phone number.'),
  address: yup.string().required('Please enter address.'),
  city: yup.string().required('Please enter city.'),
  state: yup.string(),
  zipCode: yup.string().required('Please enter zip code.'),
  country: yup.string().required('Please select country.'),
  addressType: yup.string().required(),
  defaultAddress: yup.bool(),
})

export default function AddressForm(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const handleOnSubmit = async (values) => {
    const data = {
      item: {
        name: values.name,
        phoneNumber: values.phoneNumber,
        address: values.address,
        city: values.city,
        state: values?.state,
        zipCode: values.zipCode,
        country: values.country,
        addressType: values.addressType,
        defaultAddress: values.defaultAddress,
      },
      addressID: props?.formValues?._id,
      token: localStorage.getItem('token'),
    }
    let result = null
    try {
      if (props.edit) result = await editAddress(data)
      else result = await addAddress(data)
      if (result) {
        enqueueSnackbar('Success', {
          variant: 'success',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          autoHideDuration: 2000,
        })
        props.setShowAddressForm(false)
        formik.resetForm({ values: '' })
        props.handleListAddresses()
      }
    } catch (err) {
      if (err?.response?.data) {
        enqueueSnackbar(err.response.data.message, {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          autoHideDuration: 2000,
        })
      } else {
        enqueueSnackbar("Something's wrong.", {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          autoHideDuration: 2000,
        })
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      name: props.edit ? props.formValues.name : '',
      phoneNumber: props.edit ? props.formValues.phoneNumber : '',
      address: props.edit ? props.formValues.address : '',
      city: props.edit ? props.formValues.city : '',
      state: props.edit ? props.formValues.state : '',
      zipCode: props.edit ? props.formValues.zipCode : '',
      country: props.edit ? props.formValues.country : '',
      addressType: props.edit ? props.formValues.addressType : 'home',
      defaultAddress: props.edit ? props.formValues.defaultAddress : true,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: handleOnSubmit,
  })

  return (
    <div>
      <Dialog
        open={props.showAddressForm}
        onClose={() => props.setShowAddressForm(false)}
        maxWidth="sm"
        fullWidth
        scroll="body"
      >
        <Card className="px-10 pt-5 pb-3 relative">
          <Clear
            className="absolute right-2 top-2 text-gray-500 cursor-pointer"
            onClick={() => props.setShowAddressForm(false)}
          />
          {/* Form label */}
          <h1 className="text-center text-2xl">
            {props.edit ? 'Edit Address' : 'Add New Address'}
          </h1>
          <form className="flex flex-col mt-4" onSubmit={formik.handleSubmit}>
            {/* Address type */}
            <RadioGroup
              row
              id="addressType"
              name="addressType"
              value={formik.values.addressType}
              onChange={formik.handleChange}
            >
              <FormControlLabel value="home" control={<Radio />} label="Home" />
              <FormControlLabel
                value="office"
                control={<Radio />}
                label="Office"
              />
            </RadioGroup>
            <div className="flex w-full">
              {/* Full name */}
              <TextField
                id="name"
                name="name"
                label="Full Name"
                className="grow"
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />

              {/* Phone number */}
              <TextField
                id="phoneNumber"
                name="phoneNumber"
                label="Phone Number"
                className="grow ml-4"
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
              />
            </div>

            {/* Address */}
            <TextField
              id="address"
              name="address"
              className="relative mt-2"
              label="Address"
              variant="standard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
            <div className="flex mt-2">
              {/* Town / City */}
              <TextField
                id="city"
                name="city"
                label="Town / City"
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />

              {/* State */}
              <TextField
                id="state"
                name="state"
                className="ml-4"
                label="State"
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.state}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
              />

              {/* Zip / Postal Code */}
              <TextField
                id="zipCode"
                name="zipCode"
                className="ml-4"
                label="Zip / Postal Code"
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.zipCode}
                error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                helperText={formik.touched.zipCode && formik.errors.zipCode}
              />
            </div>

            {/* Country */}
            <FormControl variant="standard">
              <InputLabel
                error={formik.touched.country && Boolean(formik.errors.country)}
              >
                Country
              </InputLabel>
              <Select
                id="country"
                name="country"
                value={formik.values.country}
                label="Country"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.country && Boolean(formik.errors.country)}
              >
                {Object.keys(countries).map((country) => (
                  <MenuItem value={country} key={country}>
                    {countries[country]}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.country && formik.errors.country && (
                <FormHelperText error>{formik.errors.country}</FormHelperText>
              )}
            </FormControl>

            {/* Set address as default */}
            {(!props.edit || !props.formValues.defaultAddress) && (
              <FormControlLabel
                className="mt-4"
                control={
                  <Checkbox
                    id="defaultAddress"
                    name="defaultAddress"
                    value={formik.values.defaultAddress}
                    checked={formik.values.defaultAddress}
                    onChange={formik.handleChange}
                  />
                }
                label="Set this address as default"
              />
            )}

            <div className="text-center mt-6 flex place-content-center">
              {props.edit && (
                <Button
                  className="w-fit mr-2"
                  variant="outlined"
                  onClick={() => props.setShowAddressForm(false)}
                >
                  Cancel
                </Button>
              )}
              <Button className="w-fit" variant="contained" type="submit">
                {props.edit ? 'Save Changes' : 'Submit'}
              </Button>
            </div>
          </form>
        </Card>
      </Dialog>
    </div>
  )
}
