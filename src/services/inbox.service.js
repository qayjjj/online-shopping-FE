import axios from 'axios'
import { URL } from '.'

const extendPath = '/api/inbox'
const userURL = `${URL}${extendPath}`

export const getInbox = (data) => {
  return axios({
    method: 'POST',
    url: `${userURL}/get`,
    data,
  })
}

export const getLatestTexts = (data) => {
  return axios({
    method: 'POST',
    url: `${userURL}/getLatestTexts`,
    data,
  })
}
