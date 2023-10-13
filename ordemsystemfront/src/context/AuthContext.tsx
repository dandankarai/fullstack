import { createContext, ReactNode, useContext, useState } from 'react'
import { destroyCookie } from 'nookies'
import Router from 'next/router'


interface AuthContextProps {
  user: UserProps
  isAuthenticated: boolean
  signIn: (credentials: SignInProps) => Promise<void>
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
    console.log({ email, password })
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}