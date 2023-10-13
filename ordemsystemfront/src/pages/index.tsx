'use client'
import Link from "next/link";

import '../app/globals.css'
import { useState } from "react";

export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleLogin() {
    alert('login')
  }

  return (
    <div className="flex flex-col h-screen gap-4 items-center justify-center">
      <input type="text" value={email} onChange={(ev) => setEmail(ev.target.value)} placeholder="Email" className="bg-gray-900 w-96 rounded h-10 text-white pl-3 placeholder-white" />
      <input type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} placeholder="Password" className="bg-gray-900 w-96 rounded h-10 text-white pl-3 placeholder-white" />


      <button onClick={handleLogin} className="bg-orange-400 rounded h-10 text-lg hover:bg-slate-400 w-96" >Login</button>

      <Link href='/register'>
        <p>Do not have account? <strong>Register</strong></p>
      </Link>
    </div >
  )
}
