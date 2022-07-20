import axios from 'axios'
import { URL } from '.'

const extendPath = '/api/product'
const userURL = `${URL}${extendPath}`

export const deleteProduct = (data) => {
  return axios({
    method: 'POST',
    url: `${userURL}/dashboard/delete`,
    data,
  })
}

export const addProduct = (data) => {
  return axios({
    method: 'POST',
    url: `${userURL}/dashboard/add`,
    data,
  })
}

export const listProducts = (data) => {
  return axios({
    method: 'POST',
    url: `${userURL}/dashboard/list`,
    data,
  })
}

export const viewProductDetails = (params) => {
  return axios({
    method: 'GET',
    url: `${userURL}/details`,
    params,
  })
}

export const getAllProducts = () => {
  return axios({
    method: 'GET',
    url: `${userURL}/getAll`,
  })
}
export const getTopProducts = (data) => {
  return axios({
    method: 'GET',
    url: `${userURL}/getTop`,
    data,
  })
}
