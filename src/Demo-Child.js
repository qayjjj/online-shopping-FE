import { Button, TextField } from '@mui/material'
import React, { useRef } from 'react'

export default function DemoChild(props) {
  const textRef = useRef()

  const handleClick = () => {
    const newVal = textRef.current.value
    props.handleAddValue(newVal)
  }
  return (
    <div>
      <h3>{props.value}</h3>
      <TextField label={'New Val'} inputRef={textRef} />
      <Button onClick={handleClick}>ADD VALUE</Button>
    </div>
  )
}
