import Link from "next/link";
import { useState } from "react";
import { IoMdPricetag } from 'react-icons/io'
import { onlyUserAuthenticated } from "@/utils/onlyUserAuthenticated";
import NavBar from "@/components/navbar";
import { FiChevronLeft } from 'react-icons/fi'
import { setupApiClient } from "@/services/api";
import Router from "next/router";

interface NewHaircutProps {
  subscription: boolean,
  count: number
}

export default function New({ subscription, count }: NewHaircutProps) {
  const [nameHaircut, setNameHaircut] = useState('')
  const [price, setPrice] = useState('')

  async function handleRegister() {

    if (nameHaircut === '' || price === '') {
      return
    }
    try {
      const apiClient = setupApiClient()

      await apiClient.post('/haircut', {
        name: nameHaircut,
        price: Number(price)
      })

      Router.push('/haircuts')
    } catch (error) {
      console.log('Error in register haircut')
    }
  }

  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-start m-5">
        <div className="flex flex-row items-center">
          <Link href='/haircuts'>
            <button className="flex items-center justify-center gap-1 bg-slate-500 rounded w-16 mr-4">
              <FiChevronLeft />
              <p>Back</p>
            </button>
          </Link>
          <h1 className="text-orange-400 text-3xl">Register your haircut</h1>
        </div>

        <div className="flex flex-col text-3xl max-w-3xl mt-3 w-screen bg-slate-600 items-center justify-center pt-8 pb-8 rounded">
          <h1 className="mb-4">Haircuts</h1>

          <input
            type="text"
            value={nameHaircut}
            onChange={(ev) => setNameHaircut(ev.target.value)}
            placeholder="Name haircut" className="bg-gray-900 w-4/5 text-sm rounded h-10 text-white pl-3 placeholder-white mb-3" />

          <input
            type="text"
            value={price}
            onChange={(ev) => setPrice(ev.target.value)}
            placeholder="Value" className="bg-gray-900 w-4/5 text-sm rounded h-10 text-white pl-3 placeholder-white mb-3" />

          <button
            onClick={handleRegister}
            className="bg-orange-400 rounded h-10 text-lg hover:bg-slate-400 w-4/5" >
            Register
          </button>
          {!subscription && count >= 3 && (
            <div>
              <p>{`You've reached your haircut limit`}</p>
              <a onClick={() => alert('Soon, upgrade account')}>
                <p>Upgrade account</p>
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

//First return getServer and verify if is logged and only then return dashboard
export const getServerSideProps = onlyUserAuthenticated(async (context) => {

  try {

    const apiClient = setupApiClient()

    const res = await apiClient.get('/haircut/check')
    const countHaircut = await apiClient.get('/haircut/count')


    return {
      props: {
        subscription: res?.data?.subscription?.status === 'active' ? true : false,
        count: countHaircut.data
      }
    }

  } catch (error) {
    console.log(error)
  }
  return {
    props: {

    }
  }
})