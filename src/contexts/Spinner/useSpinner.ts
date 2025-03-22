import { useContext } from 'react'
import SpinnerContext from './SpinnerContext'

const useSpinner = () => useContext(SpinnerContext)

export default useSpinner