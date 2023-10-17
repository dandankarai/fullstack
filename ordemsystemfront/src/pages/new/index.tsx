import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { IoMdPricetag } from 'react-icons/io'
import { onlyUserAuthenticated } from "@/utils/onlyUserAuthenticated";
import NavBar from "@/components/navbar";
import { setupApiClient } from "@/services/api";
import { FiChevronLeft } from 'react-icons/fi'
import Router from 'next/router'


interface NewHaircutProps {
  id: string,
  name: string,
  price: number | string
  status: boolean
  user_id: string
}

interface HaircutsProps {
  haircuts: NewHaircutProps[]
}

export default function NewSchedule({ haircuts }: HaircutsProps) {

  const [customer, setCustomer] = useState('')
  const [haircutSelected, setHaircutSelected] = useState<NewHaircutProps | undefined>(haircuts[0])


  function handleChangeSelect(id: string) {
    const haircutItem = haircuts?.find((item) => item?.id === id)
    setHaircutSelected(haircutItem)
  }

  // Not Working, Error "Argument 'customer' is missing"
  async function handleRegister() {
    alert('Error in this function')

    //   try {
    //     const apiClient = setupApiClient()

    //     await apiClient.post('/schedule', {
    //       params: {
    //         customer: customer,
    //         haircut_id: haircutSelected?.id
    //       }
    //     })

    //     Router.push('/dashboard')
    //   } catch (error) {
    //     console.log('Error in Register schedule')
    //   }
  }

  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-start items-center m-5">
        <div className="flex justify-start items-center w-screen max-w-3xl">
          <Link href='/haircuts'>
            <button className="flex items-center justify-center gap-1 bg-slate-500 rounded w-16 mr-4">
              <FiChevronLeft />
              <p>Back</p>
            </button>
          </Link>
          <h1 className="text-orange-400 text-3xl">Schedule service</h1>
        </div>

        <div className="flex flex-col text-3xl max-w-3xl mt-3 w-screen bg-slate-600 items-center justify-center pt-8 pb-8 rounded">
          <h1 className="mb-4">New service costumer</h1>

          <input
            data-test-id='inputNameCustomer'
            type="text"
            value={customer}
            onChange={(ev) => setCustomer(ev.target.value)}
            placeholder="Name client" className="bg-gray-900 w-4/5 text-sm rounded h-10 text-white pl-3 placeholder-white mb-3" />

          <select onChange={(ev) => handleChangeSelect(ev.target.value)} id="countries" className="bg-gray-900 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-3">
            {haircuts?.map(item => (
              <option key={item.id} value={item?.id}>{item?.name}</option>
            ))}
          </select>
          <button
            data-testid='registerButtonNewSchedule'
            onClick={handleRegister}
            className="bg-orange-400 rounded h-10 text-lg hover:bg-slate-400 w-4/5" >
            Register
          </button>

        </div>
      </div>
    </>
  )
}


//First return getServer and verify if is logged and only then return dashboard
export const getServerSideProps = onlyUserAuthenticated(async (context) => {

  try {
    const apiClient = setupApiClient(context)

    const res = await apiClient.get('/haircuts', {
      params: {
        status: true
      }
    })

    if (res.data === null) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false
        }
      }
    }
    return {
      props: {
        haircuts: res.data
      }
    }

  } catch (error) {
    console.log(error)
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false
      }
    }
  }
})