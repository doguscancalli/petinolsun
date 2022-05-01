export function validateRegisterInput(name, email, password) {
  const errors = {}
  if (name.trim() === '') {
    errors.name = 'İsim gereklidir'
  } else {
    const regEx = /[\p{L}-]+([^\s]+\s)+[^\s]+/gu
    if (!name.match(regEx)) {
      errors.name = 'Ad soyad en az 1 kelime ve harflerden oluşmalıdır'
    }
  }
  if (name.length > 30) {
    errors.name = 'İsim 30 karakterden fazla olamaz'
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
