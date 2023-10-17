import { useContext, useState } from "react";
import NavBar from "@/components/navbar";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { onlyUserAuthenticated } from "@/utils/onlyUserAuthenticated";

import { setupApiClient } from '../../services/api'


interface UserProps {
  id: string,
  name: string,
  email: string,
  address: string
}

interface ProfileUserProps {
  user: UserProps,
  premium: boolean
}
export default function Profile({ user, premium }: ProfileUserProps) {

  const [nameBarber, setNameBarber] = useState(user && user?.name)
  const [address, setAddress] = useState(user && user?.address)

  async function updateAccount() {
    if (!nameBarber) return


    const apiClient = setupApiClient()

    try {
      await apiClient.put('/users', {
        name: nameBarber,
        address: address
      })

      alert('Update with sucess')
    } catch (error) {
      console.log('Error safe infos')
    }
  }

  return (
    <>
      <NavBar />
      <div className="flex justify-center gap-4 items-center mt-80 ">
        <div className="flex flex-col">

          <p className="mb-2 font-bold text-white">Name of your barber:</p>
          <input data-testid='nameBarber' type="text" value={nameBarber} onChange={(ev) => setNameBarber(ev.target.value)} placeholder="Name your barber" className="bg-gray-900 w-96 rounded h-10 text-white pl-3 placeholder-white mb-4" />

          <p className="mb-2 font-bold text-white">Address:</p>
          <input data-testid='address' type="text" value={address} onChange={(ev) => setAddress(ev.target.value)} placeholder="Adress" className="bg-gray-900 w-96 rounded h-10 text-white pl-3 placeholder-white mb-4" />

          <p className="mb-2 font-bold text-white">Actual plan:</p>
          <div className="flex flex-row p-2 rounded items-center justify-between mb-4 bg-slate-500">
            <p className="font-bold text-white">
              Plan {premium ? 'Premium' : "Free"}
            </p>
            <a data-testid='buttonChangePlan' onClick={() => alert('Upgrade account not working')} className="text-lime-400 cursor-pointer">
              Change plan
            </a>
          </div>

          <button onClick={updateAccount} className="mt-3 mb-4 bg-orange-400 hover:bg-orange-200   rounded h-10 font-bold">Safe</button>
        </div>
      </div >
    </>
  )
}

export const getServerSideProps = onlyUserAuthenticated(async (context) => {

  try {
    const api = setupApiClient(context)
    const res = await api.get('/me')

    console.log('aqui', res.data)

    const user = {
      id: res.data.id,
      name: res.data.name,
      email: res.data.email,
      address: res.data.address
    }

    console.log(user)

    return {
      props: {
        user: user,
        premium: res?.data?.subscription?.status === 'active' ? true : false
      }
    }

  } catch (error) {
    console.log('error', error)
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false
      }
    }
  }

})