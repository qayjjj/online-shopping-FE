import axios from 'axios'
import { URL } from '.'

const extendPath = '/api/order'
const userURL = `${URL}${extendPath}`

export const completeOrder = (data) => {
  return axios({
    method: 'POST',
    url: `${userURL}/complete`,
    data,
  })
}
export const getOrderDetails = (params) => {
  return axios({
    method: 'GET',
    url: `${userURL}/getDetails`,
    params,
  })
}
export const getAllOrders = (data) => {
  return axios({
    method: 'GET',
    url: `${userURL}/getAll`,
    data,
  })
}
