import axios from 'axios'
import { URL } from '.'

const extendPath = '/api/address'
const userURL = `${URL}${extendPath}`

export const viewAddresses = (data) => {
  return axios({
    method: 'POST',
    url: `${userURL}/view`,
    data,
  })
}
export const addAddress = (data) => {
  return axios({
    method: 'POST',
    url: `${userURL}/add`,
    data,
  })
}

export const deleteAddress = (data) => {
  return axios({
    method: 'POST',
    url: `${userURL}/delete`,
    data,
  })
}

export const editAddress = (data) => {
  return axios({
    method: 'POST',
    url: `${userURL}/edit`,
    data,
  })
}
