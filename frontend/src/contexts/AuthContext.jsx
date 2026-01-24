import { createContext, useState, useContext } from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const getInitialUser = () => {
    try {
      const storedUser = localStorage.getItem('user')
      if (!storedUser) {
        return null
      }
      const userData = JSON.parse(storedUser)
      return userData && userData.token ? userData : null
    }
    catch (e) {
      console.error('Failed to parse user from localStorage', e)
      return null
    }
  }

  const [user, setUser] = useState(getInitialUser())

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData))
    setUser({ username: userData.username, token: userData.token })
  }

  const logOut = () => {
    localStorage.removeItem('user')
    setUser(null)
  }
  const getAuthHeader = () => {
    const userData = getInitialUser()
    if (userData && userData.token) {
      return { Authorization: `Bearer ${userData.token}` }
    }
    return {}
  }

  return (
    <AuthContext.Provider value={{
      logIn, logOut, user, getAuthHeader,
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
