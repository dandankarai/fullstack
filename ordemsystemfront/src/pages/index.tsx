"use client";
import Link from "next/link";

import "../app/globals.css";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function Login() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    await signIn({ email, password });
  }

  return (
    <div className="flex flex-col h-screen gap-4 items-center justify-center">
      <input
        data-testid='inputEmail'
        type="email"
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
        placeholder="Email"
        className="bg-gray-900 w-96 rounded h-10 text-white pl-3 placeholder-white focus:placeholder:''"
      />

      <input
        data-testid='inputPassword'
        type="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
        placeholder="Password"
        className="bg-gray-900 w-96 rounded h-10 text-white pl-3"
      />

      <button
        data-testid='buttonLogin'
        onClick={handleLogin}
        className="bg-orange-400 rounded h-10 text-lg hover:bg-slate-400 w-96"
      >
        Login
      </button>

      <Link data-testid='buttonRegister' href="/register">
        <p>
          Do not have account? <strong>Register</strong>
        </p>
      </Link>
    </div>
  );
}
