import React from 'react'
import SignUpBanner from './Banner'
import SignUpForm from './Form'

export default function Signup() {
  return (
    <div className="flex">
      <SignUpBanner />
      <SignUpForm />
    </div>
  )
}
