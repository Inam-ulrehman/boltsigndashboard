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
export const setItemInLocalStorage = (name, item) => {
  localStorage.setItem(name, JSON.stringify(item))
}

export const getItemFromLocalStorage = (item) => {
  const find = localStorage.getItem(item)
  const result = find ? JSON.parse(find) : null
  return result
}

export const removeItemFromLocalStorage = (item) => {
  localStorage.removeItem(item)
}
