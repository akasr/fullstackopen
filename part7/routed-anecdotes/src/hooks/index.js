import { useState } from "react";

export const useFilter = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onReset = (event) => {
    setValue('')
  }

  return {
    type, value, onChange, onReset
  }
}