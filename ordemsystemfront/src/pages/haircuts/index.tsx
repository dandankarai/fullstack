import Link from "next/link";
import { useState } from "react";
import { IoMdPricetag } from 'react-icons/io'
import { onlyUserAuthenticated } from "@/utils/onlyUserAuthenticated";
import NavBar from "@/components/navbar";

export default function Haircuts() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')

  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center gap-4 items-center">
        <div className="flex justify-end mt-24 w-4/5 items-end">
          <label className="relative inline-flex items-center mb-5 cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Active</span>
          </label>

        </div>
        <div className="flex flex-row w-4/5 justify-between">
          <h1 className="text-orange-400 text-3xl" >Haircuts models</h1>
          <Link href='/haircuts/new' className="flex justify-center items-center bg-orange-400 rounded h-10 hover:bg-slate-400 w-48" >Register new haircut</Link>
        </div>

        <Link className="w-4/5 flex justify-around bg-slate-600 h-10 rounded items-center" href='/haircuts/123'>
          <div className="flex w-4/5 gap-2 items-center">
            <IoMdPricetag color='#FBA931' />
            <p>Pixie cut</p>
          </div>
          <p>USD 20.00</p>
        </Link>
      </div>
    </>
  )
}

//First return getServer and verify if is logged and only then return dashboard
export const getServerSideProps = onlyUserAuthenticated(async (context) => {
  return {
    props: {

    }
  }
})