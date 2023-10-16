import { ChangeEvent, useContext, useState } from "react";
import NavBar from "@/components/navbar";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { onlyUserAuthenticated } from "@/utils/onlyUserAuthenticated";
import { FiChevronLeft } from 'react-icons/fi'
import { setupApiClient } from '../../services/api'
import Router from "next/router";

interface EditHaircutItemProps {
  id: string,
  name: string,
  price: number | string
  status: boolean,
  user_id: string
}

interface SubscriptionsProps {
  id: string,
  status: string
}

interface EditHaircutProps {
  haircut: EditHaircutItemProps
  subscription: SubscriptionsProps | null
}


export default function EditHairCut({ subscription, haircut }: EditHaircutProps) {

  const [nameHaircut, setnameHaircut] = useState(haircut?.name)
  const [price, setPrice] = useState(haircut?.price)
  const [status, setStatus] = useState(haircut?.status)

  const [disableStatus, setdisableStatus] = useState(haircut?.status ? 'disable' : 'enable')

  function handleChangeStatus(ev: ChangeEvent<HTMLInputElement>) {
    if (ev.target.value === 'disable') {
      setdisableStatus('enable')
      setStatus(false)
    } else {
      setdisableStatus('disable')
      setStatus(true)
    }
  }

  async function handleUpdate() {
    console.log({
      nameHaircut,
      price,
      status
    })

    try {
      const apiClient = setupApiClient()

      await apiClient.put('/haircut', {
        name: nameHaircut,
        price: Number(price),
        status: status,
        haircut_id: haircut?.id
      })

      Router.push('/haircuts')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-center m-5">
        <div className="flex flex-row items-start max-w-3xl w-screen">
          <Link href='/haircuts'>
            <button className="flex items-center justify-center gap-1 bg-slate-500 rounded w-16 mr-4">
              <FiChevronLeft />
              <p>Back</p>
            </button>
          </Link>
          <h1 className="text-orange-400 text-3xl">Edit your haircut</h1>
        </div>

        <div className="flex flex-col text-3xl max-w-3xl mt-3 w-screen bg-slate-600 items-center justify-center pt-8 pb-8 rounded">
          <h1 className="mb-4">Haircuts</h1>

          <input
            type="text"
            value={nameHaircut}
            onChange={(ev) => setnameHaircut(ev.target.value)}
            placeholder="Name haircut" className="bg-gray-900 w-4/5 text-sm rounded h-10 text-white pl-3 placeholder-white mb-3" />

          <input
            type="text"
            value={price}
            onChange={(ev) => setPrice(ev.target.value)}
            placeholder="Value" className="bg-gray-900 w-4/5 text-sm rounded h-10 text-white pl-3 placeholder-white mb-3" />

          <div className="flex w-4/5">
            <label className="relative inline-flex items-center mb-5 cursor-pointer">
              <input type="checkbox"
                value={disableStatus}
                onChange={(ev: ChangeEvent<HTMLInputElement>) => handleChangeStatus(ev)}
                className="sr-only peer"
                checked={disableStatus === 'disable' ? false : true}
              />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Disable Haircut</span>
            </label>
          </div>
          <button
            onClick={handleUpdate}
            disabled={subscription?.status !== 'active'}
            className="bg-orange-400 rounded h-10 text-lg hover:bg-slate-400 w-4/5" >
            Safe
          </button>

        </div>
      </div>
    </>
  )
}

export const getServerSideProps = onlyUserAuthenticated(async (context) => {
  const { id } = context.params

  try {
    const api = setupApiClient(context)

    const verifyWithUserHasSubscription = await api.get('/haircut/check')

    const res = await api.get('/haircut/detail', {
      params: {
        haircut_id: id
      }
    })

    return {
      props: {
        haircut: res.data,
        subscription: verifyWithUserHasSubscription?.data?.subscriptions
      }
    }

  } catch (error) {
    console.log('error', error)
    return {
      redirect: {
        destination: '/haircuts',
        permanent: false
      }
    }
  }

})