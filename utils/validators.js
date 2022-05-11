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

export function validatePetPostInput(input) {
  const { name, location, description } = input
  const errors = {}
  if (name.length > 50) {
    errors.name = 'İsim/Başlık 50 karakterden fazla olamaz'
  }
  if (location.length > 30) {
    errors.location = 'Lokasyon 30 karakterden fazla olamaz'
  }
  if (description.length <= 20) {
    errors.description = 'Açıklama en az 20 karakterden oluşmalıdır'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}
