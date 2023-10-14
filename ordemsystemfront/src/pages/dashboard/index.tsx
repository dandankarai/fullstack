import Link from "next/link";
import { useState } from "react";

import { onlyUserAuthenticated } from "@/utils/onlyUserAuthenticated";

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')

  function handleRegister() {
    alert('Registro')
  }

  return (
    <div className="flex flex-col justify-center h-screen gap-4 items-center">
      <h1>Tela de dashboard</h1>
    </div>
  )
}

//First return getServer and verify if is logged and only then return dashboard
export const getServerSideProps = onlyUserAuthenticated(async (context) => {
  return {
    props: {

    }
  }
})