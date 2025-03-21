import Joi from 'joi'

const email = Joi.string().email({ tlds: false }).required().messages({
  'string.email': 'Vous devez entrer une adresse email valide.',
  'string.empty': 'Une adresse email est requise.',
})
const password = Joi.string().min(8).required().messages({
  'string.min': 'Votre mot de passe doit contenir au moins 8 caractères.',
  'string.empty': 'Un mot de passe est requis.'
})

const signUpSchema = Joi.object({
    email: email,
    password: password,
})

const signInSchema = Joi.object({
    email: email,
    password: password
})

export function signUpValidator(email: string, password: string) {
  const { error } = signUpSchema.validate({ email, password }, { abortEarly: false })
  if (error) {
    return error.details.map(err => {
      if (err.path && err.path.length > 0) {
        return { message: err.message, type: err.path[0] as string}
      }
    }).filter((item): item is { message: string; type: string } => item !== undefined)
  }
}

export function signInValidator(email: string, password: string) {
  const { error } = signInSchema.validate({ email, password }, { abortEarly: false })
  if (error) {
    return error.details.map(err => {
      if (err.path && err.path.length > 0) {
        return { message: err.message, type: err.path[0] as string }
      }
    }).filter((item): item is { message: string; type: string } => item !== undefined)
  }
  return []
}