import fetch from 'node-fetch'
import qs from 'querystring'

import config from '../config'

const api = async (uri, options = {}) => {
  const { method = 'GET', body, headers, query } = options
  const url = query ? `${uri}?${qs.stringify(query)}` : uri
  const response = await fetch(url, {
    headers: {
      ...headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method,
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const error = new Error(response.statusText)
    error.response = response
    throw error
  }

  const json = await response.json()

  return json
}

export const tempestApi = (endpoint, options = {}) => {
  const url = config['tempest-api']

  return api(`${url}${endpoint}`, options)
}

export const cityworksApi = async (endpoint, data) => {
  const { url, token } = config.cityworks
  const query = { token, data: JSON.stringify(data) }

  const json = await api(`${url}/services/${endpoint}`, { query })
  if (!json.Value || json.Status !== 0) {
    throw new Error(json.Message)
  }

  return json
}

export default api
