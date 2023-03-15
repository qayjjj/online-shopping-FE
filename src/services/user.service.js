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

export const getAllUsers = (data) => {
  return axios({
    method: 'GET',
    url: `${userURL}/getAll`,
    data,
  })
}

export const getUser = (data) => {
  return axios({
    method: 'POST',
    url: `${userURL}/get`,
    data,
  })
}

export const getFriends = (data) => {
  return axios({
    method: 'POST',
    url: `${userURL}/getFriends`,
    data,
  })
}

export const addUser = (data) => {
  return axios({
    method: 'POST',
    url: `${userURL}/add`,
    data,
  })
}
