import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DemoChild from './Demo-Child'

export default function Demo() {
  const [value, setValue] = useState(2)
  const { productID } = useParams()
  useEffect(() => {
    console.log(productID)
  }, [])

  return <div></div>
}
