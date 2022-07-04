import axios from 'axios'
import { URL } from '.'

const extendPath = '/api/account'
const userURL = `${URL}${extendPath}`

export const userLogin = (data) => {
  return axios({
    method: 'POST',
    url: `${userURL}/login`,
    data,
  })
}

export const userSignup = (data) => {
  return axios({
    method: 'POST',
    url: `${userURL}/signup`,
    data,
  })
}

export const verifyToken = (data) => {
  return axios({
    method: 'POST',
    url: `${userURL}/verify`,
    data,
  })
}
