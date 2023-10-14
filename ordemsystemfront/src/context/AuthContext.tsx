import { createContext, ReactNode, useContext, useState } from 'react'
import { destroyCookie, setCookie } from 'nookies'
import Router from 'next/router'
import { api } from '../services/apiClient'


interface AuthContextProps {
  user: UserProps
  isAuthenticated: boolean
  signIn: (credentials: SignInProps) => Promise<void>
  signUp: (credentials: SignUpProps) => Promise<void>
  logout: () => Promise<void>
}

interface UserProps {
  id: string,
  name: string,
  email: string,
  address: string | null
  subscriprtion?: SubscriptionsProps | null
}

interface SubscriptionsProps {
  id: string
  status: string
}

type AuthProviderProps = {
  children: ReactNode
}

interface SignUpProps {
  name: string
  email: string,
  password: string
}


interface SignInProps {
  email: string,
  password: string
}

export const AuthContext = createContext({} as AuthContextProps)

export function signOut() {
  console.log('errro')
  try {
    destroyCookie(null, '@login.token', { path: '/' })
    Router.push('/')
  } catch (error) {
    console.log('error', error)
  }
}

export function AuthProvider({ children }: AuthProviderProps) {

  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user

  async function signIn({ email, password }: SignInProps) {
    try {

      const res = api.post('/userSession', {
        email, password
      })

      const { id, name, token, subscriprtion, address } = (await res).data

      setCookie(undefined, '@login.token', token, {
        maxAge: 60 * 60 * 24 * 30, //expire 1 month
        path: '/'
      })

      setUser({
        id, name, email, subscriprtion, address
      })

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      Router.push('/dashboard')
    } catch (error) {
      console.log('Erro in signIn')
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {

      const res = api.post('/users', {
        name, email, password
      })

      Router.push('/')
    } catch (error) {
      console.log('Erro in signUp')
    }
  }

  async function logOut() {
    try {
      destroyCookie(null, '@login.token', { path: '/' })
      Router.push('/')
    } catch (error) {
      console.log('Erro logout')
    }
  }





  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}