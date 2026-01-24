import axios from 'axios'

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` }
  }

  return {}
}

export default () => axios.create({
  headers: getAuthHeader(),
})
