import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')

  function handleRegister() {
    alert('Registro')
  }

  return (
    <div className="flex flex-col justify-center h-screen gap-4 items-center">

      <input type="text" value={userName} onChange={(ev) => setUserName(ev.target.value)} placeholder="Username" className="bg-gray-900 w-96 rounded h-10 text-white pl-3 placeholder-white" />


      <input type="text" value={email} onChange={(ev) => setEmail(ev.target.value)} placeholder="Email" className="bg-gray-900 w-96 rounded h-10 text-white pl-3 placeholder-white" />


      <input type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} placeholder="Password" className="bg-gray-900 w-96 rounded h-10 text-white pl-3 placeholder-white" />

      <button onClick={handleRegister} className="bg-orange-400 rounded h-10 text-lg hover:bg-slate-400 w-96">Register</button>

      <Link href='/'>
        <p>Have account? <strong>Login</strong> </p>
      </Link>
    </div>
  )
}