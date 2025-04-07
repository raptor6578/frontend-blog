import React, { useState } from 'react'
import { signUpValidator } from '../../validators/authValidator'
import usePostSignUp from '../../hooks/usePostSignUp'

interface SignUpFormProps {
  messages: {
    addError: (message: string) => void,
    clearErrors: () => void,
    addSuccess: (message: string) => void,
    clearSuccess: () => void
  }
}

const SignUpForm:React.FC<SignUpFormProps> = ({messages}: SignUpFormProps) => {

  const [email, setEmail] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')
  const post  = usePostSignUp({messages})
  const { addError, clearErrors } = messages

  const validatorErrors = (email: string, username: string, password: string, passwordConfirm: string) => {
    clearErrors()
    const validatorErrors = signUpValidator(email, username, password, passwordConfirm)
    validatorErrors.forEach(error => addError(error.message))
    return validatorErrors.length > 0
  } 

  const handleForm = (formData: FormData) => {
    const email = formData.get('email') as string
    const username = formData.get('username') as string
    const password = formData.get('password') as string
    const passwordConfirm = formData.get('passwordConfirm') as string
    const validator = validatorErrors(email, username, password, passwordConfirm)
    if (validator) return
    post(email, username, password)
  }

  return (
    <form action={handleForm}>
      <label htmlFor="email">Email</label>
      <input 
        type="email" 
        id="email" 
        name="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email}
        className="input-text"
      />
      <label htmlFor="username">Nom d'utilisateur</label>
      <input
        type="text"
        id="username"
        name="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        className="input-text"
      />
      <label htmlFor="password">Mot de passe</label>
      <input 
        type="password" 
        id="password" 
        name="password" 
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="input-text"
      />
      <label htmlFor="password">Confirmez votre mot de passe</label>
      <input 
        type="password" 
        id="passwordConfirm" 
        name="passwordConfirm" 
        onChange={(e) => setPasswordConfirm(e.target.value)}  
        value={passwordConfirm}
        className="input-text"
      />
      <button className="blue-button" type="submit">Inscription</button>
    </form>
  )
}
export default SignUpForm