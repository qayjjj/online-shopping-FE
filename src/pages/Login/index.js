import React from 'react'
import LogInForm from './Form'
import LogInBanner from './Banner'

export default function Login() {
  return (
    <div className="flex">
      <LogInForm />
      <LogInBanner />
    </div>
  )
}
