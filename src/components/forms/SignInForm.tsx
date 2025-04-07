import React from 'react'
import { signInValidator } from '../../validators/authValidator'
import usePostSignIn from '../../hooks/usePostSignIn'

interface SignInFormProps {
  messages: {
    addError: (message: string) => void,
    clearErrors: () => void,
    addSuccess: (message: string) => void,
    clearSuccess: () => void
  }
}

const SignInForm = ({messages}: SignInFormProps) => {

  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const { addError, clearErrors } = messages
  const post = usePostSignIn({messages})

  const validatorErrors = (email: string, password: string) => {
    clearErrors()
    const validatorErrors = signInValidator(email, password)
    validatorErrors.forEach(error => addError(error.message))
    return validatorErrors.length > 0
  }

  const handleForm = (formData: FormData) => {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const validator = validatorErrors(email, password)
    if (validator) return
    post(email, password)
  }

  return (
    <form action={handleForm}>
      <label htmlFor="email">Email</label>
      <input 
        type="email" 
        id="email" 
        name="email" 
        className="input-text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Mot de passe</label>
      <input 
        type="password" 
        id="password" 
        name="password" 
        className="input-text"
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="blue-button" type="submit">Connexion</button>
    </form>
  )
}

export default SignInForm