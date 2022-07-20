import React, { useState } from 'react'
import { Button, Card, TextField, Dialog, InputAdornment } from '@mui/material'
import HighlightOff from '@mui/icons-material/HighlightOff'
import Clear from '@mui/icons-material/Clear'
import * as yup from 'yup'
import { addProduct, listProducts } from 'services/product.service'
import { useSnackbar } from 'notistack'
import { useFormik } from 'formik'

const validationSchema = yup.object().shape({
  userID: yup.string(),
  name: yup.string().required('Please enter product name.'),
  description: yup.string(),
  price: yup.string().required('Please enter the price.'),
  image: yup.string().required('Please upload an image.'),
  addressType: yup.bool().oneOf([true], 'Required'),
})

export default function AddProductForm(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [openDialog, setOpenDialog] = useState(false)

  const handleOnChange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.addEventListener('load', function () {
      try {
        formik.setFieldValue('image', reader.result)

        enqueueSnackbar('Success', {
          variant: 'success',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          autoHideDuration: 2000,
        })
      } catch (e) {
        enqueueSnackbar('Something is wrong', {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          autoHideDuration: 2000,
        })
      }
    })

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const handleOnSubmit = (values) => {
    let data = {
      item: {
        userID: localStorage.getItem('id'),
        name: values.name,
        description: values?.description,
        price: values.price,
        image: values.image,
      },
      token: localStorage.getItem('token'),
    }
    addProduct(data)
      .then((res) => {
        enqueueSnackbar('Success', {
          variant: 'success',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          autoHideDuration: 2000,
        })

        props.handleListProducts()
      })
      .then(() => setOpenDialog(false))
      .then(() => formik.resetForm({ values: '' }))
      .catch((err) => {
        if (err?.response?.data) {
          enqueueSnackbar(err.response.data.message, {
            variant: 'error',
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
            autoHideDuration: 2000,
          })
        } else {
          enqueueSnackbar('Some error occurred while adding the product.', {
            variant: 'error',
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
            autoHideDuration: 2000,
          })
        }
      })
  }

  const formik = useFormik({
    initialValues: {
      userID: '',
      name: '',
      description: '',
      price: '',
      image: '',
    },
    validationSchema,
    onSubmit: handleOnSubmit,
  })

  return (
    <>
      <Button
        className="mt-4"
        variant="contained"
        onClick={() => setOpenDialog(true)}
      >
        Add New Product
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
          <h1 className="text-center text-2xl">Add New Product</h1>
          <form className="flex flex-col mt-4" onSubmit={formik.handleSubmit}>
            <TextField
              id="name"
              name="name"
              label="Product Name"
              variant="standard"
              onChange={formik.handleChange}
              inputProps={{ onBlur: formik.handleBlur }}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && (
              <span className="text-red-500 text-xs">{formik.errors.name}</span>
            )}
            <TextField
              id="description"
              name="description"
              className="relative mt-2"
              label="Product Description"
              variant="standard"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
            <TextField
              id="price"
              name="price"
              className="relative mt-2"
              label="Price (in USD)"
              variant="standard"
              onChange={formik.handleChange}
              inputProps={{ onBlur: formik.handleBlur }}
              value={formik.values.price}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />

            <Button className="mt-4 h-8" variant="contained" component="label">
              Upload An Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => handleOnChange(e)}
              />
              <input
                type="text"
                hidden
                id="image"
                value={formik.values.image}
              />
            </Button>

            {formik?.values?.image !== '' && (
              <div className="grid place-items-center">
                <img
                  id="image-data"
                  src={formik.values.image}
                  className="mt-4 w-90"
                />
                <HighlightOff
                  className="mt-2 text-gray-400 cursor-pointer hover:text-[#6c63ff]"
                  onClick={() => formik.setFieldValue('image', '')}
                />
              </div>
            )}
            <div className="text-center mt-4">
              <Button className="w-1/5" variant="contained" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Card>
      </Dialog>
    </>
  )
}
