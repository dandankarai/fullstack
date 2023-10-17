import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { useContext, useState } from "react";

export default function Register() {

  const { signUp } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  async function handleRegister() {
    if (name === '' && email === '' && password === '') {
      return
    }

    await signUp({ name, email, password })
  }

  return (
    <div className="flex flex-col justify-center h-screen gap-4 items-center">

      <input data-testid='username' type="text" value={name} onChange={(ev) => setName(ev.target.value)} placeholder="Username" className="bg-gray-900 w-96 rounded h-10 text-white pl-3 placeholder-white" />


      <input data-testid='inputEmail' type="text" value={email} onChange={(ev) => setEmail(ev.target.value)} placeholder="Email" className="bg-gray-900 w-96 rounded h-10 text-white pl-3 placeholder-white" />


      <input data-testid='inputPassword' type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} placeholder="Password" className="bg-gray-900 w-96 rounded h-10 text-white pl-3 placeholder-white" />

      <button data-testid='buttonRegister' onClick={handleRegister} className="bg-orange-400 rounded h-10 text-lg hover:bg-slate-400 w-96">Register</button>

      <Link data-testid='linkToLogin' href='/'>
        <p>Have account? <strong>Login</strong> </p>
      </Link>
    </div >
  )
}