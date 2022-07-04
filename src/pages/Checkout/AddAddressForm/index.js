import React, { useState } from 'react'
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

export default function AddAddressForm() {
  const [openDialog, setOpenDialog] = useState(false)

  const handleOnSubmit = () => {
    console.log(formik.values)
  }

  const formik = useFormik({
    initialValues: {
      userID: '',
      name: '',
      phoneNumber: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      addressType: 'home',
      defaultAddress: true,
    },
    validationSchema,
    onSubmit: handleOnSubmit,
  })
  return (
    <div>
      <Button className="mt-4" onClick={() => setOpenDialog(true)}>
        <span className="text-2xl mb-1">+</span>
        <span className="ml-2">Add New Address</span>
      </Button>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
        scroll="body"
      >
        <Card className="px-10 pt-5 pb-3 relative">
          <Clear
            className="absolute right-2 top-2 text-gray-500 cursor-pointer"
            onClick={() => setOpenDialog(false)}
          />
          {/* Form label */}
          <h1 className="text-center text-2xl">Add New Address</h1>
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

            <div className="text-center mt-4">
              <Button className="w-1/5" variant="contained" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Card>
      </Dialog>
    </div>
  )
}
