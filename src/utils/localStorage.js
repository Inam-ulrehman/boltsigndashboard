//  user in local Storage //
export const setUserInLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem('user')
  const user = result ? JSON.parse(result) : null
  return user
}

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user')
}
//  uploadImage in local Storage //
export const setImageInLocalStorage = (uploadImage) => {
  localStorage.setItem('uploadImage', JSON.stringify(uploadImage))
}

export const getImageFromLocalStorage = () => {
  const result = localStorage.getItem('uploadImage')
  const uploadImage = result ? JSON.parse(result) : null
  return uploadImage
}

export const removeImageFromLocalStorage = () => {
  localStorage.removeItem('uploadImage')
}
// =================Get Item From LocalStorage=======================
export const setItemInLocalStorage = (name, uploadImage) => {
  localStorage.setItem(name, JSON.stringify(uploadImage))
}

export const getItemFromLocalStorage = (item) => {
  const result = localStorage.getItem(item)
  const uploadImage = result ? JSON.parse(result) : null
  return uploadImage
}

export const removeItemFromLocalStorage = (item) => {
  localStorage.removeItem(item)
}
