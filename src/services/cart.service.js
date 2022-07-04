import axios from 'axios'
import { URL } from '.'

const extendPath = '/api/cart'
const userURL = `${URL}${extendPath}`

export const viewCart = (data) => {
  return axios({
    method: 'POST',
    url: `${userURL}/view`,
    data,
  })
}
export const addToCart = (data) => {
  return axios({
    method: 'POST',
    url: `${userURL}/add`,
    data,
  })
}

export const removeFromCart = (data) => {
  return axios({
    method: 'POST',
    url: `${userURL}/remove`,
    data,
  })
}

export const getTotalCartItems = (data) => {
  return axios({
    method: 'POST',
    url: `${userURL}/getQuantity`,
    data,
  })
}

export const getTotalCartValue = (data) => {
  return axios({
    method: 'POST',
    url: `${userURL}/getValue`,
    data,
  })
}
