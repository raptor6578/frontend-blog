import useSpinner from '../contexts/Spinner/useSpinner'
import { postSignIn } from '../services/signInService'
import useAuth from '../contexts/Auth/useAuth'
import useModal from '../contexts/Modal/useModal'

interface UseSignInProps {
  messages: {
    addError: (message: string) => void,
    clearErrors: () => void,
    addSuccess: (message: string) => void,
    clearSuccess: () => void
  }
}

const usePostSignIn = ({messages}: UseSignInProps) => {

  const { openSpinner, closeSpinner } = useSpinner()!
  const { addError, clearErrors } = messages
  const { signIn } = useAuth()!
  const { closeModal } = useModal()

  const post = async (email: string, password: string) => {
    clearErrors()
    try {
      openSpinner()
      const response = await postSignIn(email, password)
      signIn(response.token, response.user)
      closeSpinner()
      closeModal()
    } catch (err) {
        if (err instanceof Error) {
          addError(err.message)
          closeSpinner()
        }
    }  
  }
  return post
}

export default usePostSignIn