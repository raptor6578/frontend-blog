import { useState } from 'react'

const useRequestMessages = () => {

  const [errors, setErrors] = useState<string[]>([])
  const [success, setSuccess] = useState<string>('')

  const addError = (message: string) => {
    setErrors(errors => [...errors, message])
  }
  const clearErrors = () => {
    setErrors([])
  }
  const addSuccess = (message: string) => {
    setSuccess(message)
  }
  const clearSuccess = () => {
    setSuccess('')
  }
  return { errors, success, addError, clearErrors, addSuccess, clearSuccess }
}
export default useRequestMessages