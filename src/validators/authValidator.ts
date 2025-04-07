import Joi from 'joi'

const email = Joi.string().email({ tlds: false }).required().messages({
  'string.email': 'Vous devez entrer une adresse email valide.',
  'string.empty': 'Une adresse email est requise.',
})
const password = Joi.string().min(8).required().messages({
  'string.min': 'Votre mot de passe doit contenir au moins 8 caractères.',
  'string.empty': 'Un mot de passe est requis.'
})
const passwordConfirm = Joi.string().valid(Joi.ref('password')).messages({
  'any.only': 'Les mots de passe ne correspondent pas.'
})

const username = Joi.string().min(3).max(20).pattern(/^[a-zA-Z0-9_.-]{3,20}$/).required().messages({
  'string.min': 'Votre nom d\'utilisateur doit contenir au moins 3 caractères.',
  'string.max': 'Votre nom d\'utilisateur doit contenir au maximum 20 caractères.',
  'string.empty': 'Un nom d\'utilisateur est requis.',
  'any.required': 'Un nom d\'utilisateur est requis.',
  'string.pattern.base': 'Votre nom d\'utilisateur ne doit contenir que des lettres, des chiffres, des tirets et des underscores.'
})

const signUpSchema = Joi.object({
    email: email,
    username: username,
    password: password,
    passwordConfirm: passwordConfirm
})

const signInSchema = Joi.object({
    email: email,
    password: password
})

export function signUpValidator(email: string, username: string, password: string, passwordConfirm: string) {
  if (!passwordConfirm) {
    return [{ message: "Veuillez confirmer votre mot de passe.", type: "passwordConfirm" }]
  }
  const { error } = signUpSchema.validate({ email, username, password, passwordConfirm }, { abortEarly: false })
  if (error) {
    return error.details.map(err => {
      if (err.path && err.path.length > 0) {
        return { message: err.message, type: err.path[0] as string}
      }
    }).filter((item): item is { message: string; type: string } => item !== undefined)
  }
  return []
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