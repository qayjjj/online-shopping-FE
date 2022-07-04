import React from 'react'
import mobile from '../../../assets/img/mobile.svg'

export default function SignUpBanner() {
  return (
    <div className="bg-gradient-to-tr from-[#3034a7] to-[#444ce3] w-1/3 h-screen px-20 py-32">
      <div className="flex flex-col text-center">
        <h1 className="text-white text-4xl">Welcome</h1>
        <img className="h-1/2 mt-32" src={mobile} />
      </div>
    </div>
  )
}
