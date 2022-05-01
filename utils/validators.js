export function validateRegisterInput(name, email, password) {
  const errors = {}
  if (name === '') {
    errors.name = 'İsim gereklidir'
  }
  if (email.trim() === '') {
    errors.email = 'Eposta gereklidir'
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
    if (!email.match(regEx)) {
      errors.email = 'Geçerli bir eposta adresi giriniz'
    }
  }
  if (password === '') {
    errors.password = 'Şifre gereklidir'
  }
  if (password.length < 8) {
    errors.password = 'Şifreniz en az 8 karakter olmalıdır'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}

export function validateLoginInput(email, password) {
  const errors = {}
  if (email.trim() === '') {
    errors.email = 'Eposta gereklidir'
  }
  if (password.trim() === '') {
    errors.password = 'Şifre gereklidir'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}
