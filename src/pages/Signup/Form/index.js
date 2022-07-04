import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'

import * as yup from 'yup'
import { userSignup } from '../../../services/user.service'
import { useSnackbar } from 'notistack'
//utils
const sha256 = require('sha256')
const validationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required.'),
  lastName: yup.string().required('Last name is required.'),
  phoneNumber: yup.string().required('Phone number is required.'),
  email: yup.string().email().required('Email is required.'),
  password: yup
    .string()
    .required("Password can't be blank.")
    .min(8, 'Password is too short.'),
  confirmPassword: yup
    .string()
    .required('Password confirmation is required.')
    .oneOf([yup.ref('password')], 'Password does not match.'),
  receive: yup.bool(),
  agree: yup.bool().oneOf([true], 'Required'),
})

export default function SignUpForm() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const handleOnSubmit = (values) => {
    let data = {
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      email: values.email,
      password: sha256(values.password),
    }
    userSignup(data)
      .then((res) => {
        enqueueSnackbar('Success', {
          variant: 'success',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          autoHideDuration: 2000,
        })
      })
      .then(() => window.location.replace('/login'))
      .catch((err) => {
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
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
      receive: false,
      agree: false,
    },
    validationSchema,
    onSubmit: handleOnSubmit,
  })

  return (
    <div className="w-2/3 h-screen px-24 py-24">
      {/* Header */}
      <div className="w-1/2">
        <h1 className="text-2xl font-semibold">Register</h1>
        <h1 className="text-sm font-medium mt-10">
          Manage all your lottery efficiently
        </h1>
        <p className="text-xs text-gray-500 font-medium mt-4 leading-5">
          Let's get you all set up so you can verify your personal account and
          begin setting up your profile.
        </p>
      </div>
      <form className="flex flex-col mt-8" onSubmit={formik.handleSubmit}>
        <div className="flex">
          {/* First Name */}
          <div className="flex flex-col grow">
            <label className="text-xs font-medium">First Name</label>
            <input
              className="border-2 border-solid border-gray-200 rounded-lg h-10 px-3 mt-2"
              type="text"
              id="firstName"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <span className="text-red-500 text-xs">
                {formik.errors.firstName}
              </span>
            )}
          </div>
          {/* Last Name */}
          <div className="flex flex-col grow ml-6">
            <label className="text-xs font-medium">Last Name</label>
            <input
              className="border-2 border-solid border-gray-200 rounded-lg h-10 px-3 mt-2"
              type="text"
              id="lastName"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <span className="text-red-500 text-xs">
                {formik.errors.lastName}
              </span>
            )}
          </div>
        </div>

        <div className="flex mt-4">
          {/* Phone number */}
          <div className="flex flex-col grow">
            <label className="text-xs font-medium">Phone Number</label>
            <input
              className="border-2 border-solid border-gray-200 rounded-lg h-10 px-3 mt-2"
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <span className="text-red-500 text-xs">
                {formik.errors.phoneNumber}
              </span>
            )}
          </div>
          {/* Email */}
          <div className="flex flex-col grow ml-6">
            <label className="text-xs font-medium">Email</label>
            <input
              className="border-2 border-solid border-gray-200 rounded-lg h-10 px-3 mt-2"
              type="text"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <span className="text-red-500 text-xs">
                {formik.errors.email}
              </span>
            )}
          </div>
        </div>
        <div className="flex mt-4">
          {/* Password */}
          <div className="flex flex-col grow">
            <label className="text-xs font-medium">Password</label>
            <input
              className="border-2 border-solid border-gray-200 rounded-lg h-10 px-3 mt-2"
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <span className="text-red-500 text-xs">
                {formik.errors.password}
              </span>
            )}
          </div>
          {/* Confirm password */}
          <div className="flex flex-col grow ml-6">
            <label className="text-xs font-medium">Confirm Password</label>
            <input
              className="border-2 border-solid border-gray-200 rounded-lg h-10 px-3 mt-2"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <span className="text-red-500 text-xs">
                  {formik.errors.confirmPassword}
                </span>
              )}
          </div>
        </div>
        <div className="mt-8 flex items-center">
          <input
            type="checkbox"
            id="receive"
            name="receive"
            value={formik.values.receive}
            onChange={formik.handleChange}
          />
          <label
            className="ml-2 text-xs font-medium text-gray-500"
            for="receive"
          >
            Yes, I want to receive Lottery Display emails
          </label>
        </div>
        <div className="mt-4 flex items-center">
          <input
            className="mb-0"
            type="checkbox"
            id="agree"
            name="agree"
            value={formik.values.agree}
            onChange={formik.handleChange}
          />
          <label
            className="relative ml-2 text-xs font-medium text-gray-500"
            for="agree"
          >
            <span>I agree to all the </span>
            <span className="font-medium text-[#3339cb]">Term</span>
            <span>, </span>
            <span className="font-medium text-[#3339cb]">Privacy Policy </span>
            <span>and </span>
            <span className="font-medium text-[#3339cb]">Fees</span>

            {formik.errors.agree && (
              <span className="absolute top-4 block text-red-500 text-xs">
                {formik.errors.agree}
              </span>
            )}
          </label>
        </div>

        <button
          type="submit"
          className="bg-[#3339cb] mt-8 w-52 h-10 text-white rounded-lg flex place-content-center items-center font-medium text-sm cursor-pointer"
        >
          Create Account
        </button>
        <div className="mt-6 ">
          <span className="text-gray-500 text-sm">
            Already have an account?
          </span>
          <Link to="/login">
            <span className="font-semibold text-[#3339cb] ml-1 text-sm">
              Log in
            </span>
          </Link>
        </div>
      </form>
    </div>
  )
}
