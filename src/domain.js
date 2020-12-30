const baseUrl = "103.142.26.130:6001/"
export const getAllItem = baseUrl + "item/all"
export const seachByText = baseUrl + "item/search"
export const pantAPI = baseUrl + "item/pants"
export const loginApi = baseUrl + "auth/login"
export const searchById = baseUrl + "item"
export const userInfo = baseUrl + "user/me"

export const token = "Bearer " + localStorage.getItem("token")