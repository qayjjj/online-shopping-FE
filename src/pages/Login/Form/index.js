import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import { userLogin, verifyToken } from 'services/user.service'
import google from 'assets/img/google.svg'
import logomark from 'assets/img/Logomark.svg'
//utils
const sha256 = require('sha256')

const validationSchema = yup.object().shape({
  email: yup.string().required('Please enter email.'),
  password: yup.string().required('Please enter password.'),
})

function LogInForm() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token && token !== '') {
      verifyToken({ token })
        .then(() => {
          if (state) navigate(state.currentPage)
          else navigate('/')
        })
        .catch((e) => console.log(e))
    }
  }, [])

  const handleOnSubmit = (values) => {
    let data = { email: values.email, password: sha256(values.password) }
    userLogin(data)
      .then((response) => {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('id', response.data.userID)
      })
      .then(() => {
        if (state) navigate(state.currentPage)
        else navigate('/')
      })
      .catch((err) => {
        console.log(err)
        if (err?.response?.data) {
          enqueueSnackbar(err.response.data.message, {
            variant: 'error',
            anchorOrigin: { vertical: 'top', horizontal: 'right' },
            autoHideDuration: 2000,
          })
        }
      })
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleOnSubmit,
  })

  return (
    <div className="bg-white flex place-content-center w-1/2 h-screen py-16">
      <div className="w-1/2">
        <div className="flex">
          <img src={logomark} className="h-8" />
          <h1 className="ml-2 text-lg font-medium">Untitled UI</h1>
        </div>
        <div className="mt-12">
          <h1 className="text-3xl font-semibold">Log in</h1>
          <h2 className="text-gray-500 mt-4 text-sm">
            Welcome back! Please enter your details.
          </h2>
        </div>

        <form className="mt-6 flex flex-col" onSubmit={formik.handleSubmit}>
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            variant="outlined"
            className="mt-4"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <div className="flex justify-between items-center mt-2">
            <FormControlLabel
              control={
                <Checkbox
                  style={{
                    transform: 'scale(0.85)',
                  }}
                />
              }
              label={
                <p className="text-gray-500 text-sm">Remember for 30 days</p>
              }
            />
            <h2 className="text-sm font-semibold text-[#6c63ff]">
              Forgot password
            </h2>
          </div>

          <div className="flex flex-col mt-5">
            <Button variant="contained" type="submit" className="h-12">
              Sign in
            </Button>
            <Button
              variant="contained"
              className="mt-4 h-12 bg-white hover:bg-white"
            >
              <img src={google} className="h-6" />
              <span className="ml-2 text-black">Sign in with Google</span>
            </Button>
            <div className="mt-6 text-center">
              <span className="text-gray-500">Don't have an account?</span>
              <Link to="/signup">
                <span className="font-semibold text-[#6c63ff] ml-1">
                  Sign up
                </span>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LogInForm
