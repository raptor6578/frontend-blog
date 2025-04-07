import useSpinner from '../contexts/Spinner/useSpinner'
import { postSignUp } from '../services/signUpService'

interface UseSignUpProps {
  messages: {
    addError: (message: string) => void,
    clearErrors: () => void,
    addSuccess: (message: string) => void,
    clearSuccess: () => void
  }
}

const usePostSignUp = ({messages}: UseSignUpProps) => {

  const { openSpinner, closeSpinner } = useSpinner()!
  const { addError, clearErrors, addSuccess, clearSuccess } = messages

  const post = async (email: string, username: string, password: string) => {
    clearSuccess()
    clearErrors()
    try {
      openSpinner()
      const response = await postSignUp(email, username, password)
      addSuccess(response)
      closeSpinner()
    } catch (err) {
        if (err instanceof Error) {
          addError(err.message)
          closeSpinner()
        }
    }  
  }
  return post
}

export default usePostSignUp