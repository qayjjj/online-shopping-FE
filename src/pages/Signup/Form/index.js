import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import { useSnackbar } from 'notistack'
import { userSignup } from 'services/user.service'
import * as yup from 'yup'
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
          Manage all your products efficiently
        </h1>
        <p className="text-xs text-gray-500 font-medium mt-4 leading-5">
          Let's get you all set up so you can verify your personal account and
          begin setting up your profile.
        </p>
      </div>
      <form className="flex flex-col mt-8" onSubmit={formik.handleSubmit}>
        <div className="flex">
          {/* First Name */}
          <TextField
            id="firstName"
            name="firstName"
            label="First Name"
            variant="outlined"
            className="grow"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          {/* Last Name */}
          <TextField
            id="lastName"
            name="lastName"
            label="Last Name"
            variant="outlined"
            className="grow ml-6"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </div>

        <div className="flex mt-4">
          {/* Phone number */}
          <TextField
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            variant="outlined"
            className="grow"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phoneNumber}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
          {/* Email */}
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            className="grow ml-6"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>
        <div className="flex mt-4">
          {/* Password */}
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            variant="outlined"
            className="grow"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          {/* Confirm password */}
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            className="grow ml-6"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
        </div>

        <FormControlLabel
          className="mt-4"
          control={
            <Checkbox
              id="receive"
              name="receive"
              value={formik.values.receive}
              onChange={formik.handleChange}
              style={{
                transform: 'scale(0.75)',
              }}
            />
          }
          label={
            <p className="text-gray-500 text-xs">
              Yes, I want to receive Lottery Display emails
            </p>
          }
        />

        <div className="flex flex-col">
          <FormControlLabel
            control={
              <Checkbox
                id="agree"
                name="agree"
                value={formik.values.agree}
                onChange={formik.handleChange}
                style={{
                  transform: 'scale(0.75)',
                }}
              />
            }
            label={
              <p className="text-gray-500 text-xs">
                <span>I agree to all the </span>
                <span className="font-medium text-[#6c63ff]">Term</span>
                <span>, </span>
                <span className="font-medium text-[#6c63ff]">
                  Privacy Policy{' '}
                </span>
                <span>and </span>
                <span className="font-medium text-[#6c63ff]">Fees</span>
              </p>
            }
          />
          {formik.errors.agree && (
            <span className="-mt-2 ml-8 text-[#d32f2f] text-xs">
              {formik.errors.agree}
            </span>
          )}
        </div>

        <Button variant="contained" type="submit" className="mt-5 w-52 h-10">
          Create Account
        </Button>
        <div className="mt-6">
          <span className="text-gray-500 text-sm">
            Already have an account?
          </span>
          <Link to="/login">
            <span className="font-semibold text-[#6c63ff] ml-1 text-sm">
              Log in
            </span>
          </Link>
        </div>
      </form>
    </div>
  )
}
