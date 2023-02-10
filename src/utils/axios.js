import axios from 'axios'

// === UserData Root Url ===//

export const customFetch = axios.create({
  baseURL: 'https://boltsign.herokuapp.com/api/v1',
})
