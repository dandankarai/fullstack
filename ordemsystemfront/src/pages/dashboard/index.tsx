import Link from "next/link";
import { useState } from "react";
import { IoMdPerson } from "react-icons/io";
import { onlyUserAuthenticated } from "@/utils/onlyUserAuthenticated";
import NavBar from "@/components/navbar";
import { setupApiClient } from "@/services/api";

export interface ScheduleItemProps {
  id: string;
  customer: string;
  haircut: {
    id: string;
    name: string;
    price: string | number;
    user_id: string;
  };
}

interface UserDashboardProps {
  schedule: ScheduleItemProps[];
}

export default function Register({ schedule }: UserDashboardProps) {
  const [listUser, setListUser] = useState(schedule);

  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center gap-4 items-center">
        <div className="flex justify-between w-4/5 mt-6">
          <h1 className="text-orange-400 text-3xl">Schedule</h1>
          <Link
            data-testid="linkToRegister"
            href="/new"
            className="flex justify-center items-center bg-orange-400 rounded h-10 hover:bg-slate-400 w-48"
          >
            Register
          </Link>
        </div>
        {listUser.map((user) => (
          <Link
            key={user.id}
            className="w-4/5 flex justify-around bg-slate-600 h-10 rounded items-center"
            href={"/404"}
          >
            <div className="flex w-screen p-3 gap-2 items-center justify-between ">
              <div className="flex items-center justify-center gap-2">
                <IoMdPerson color="#FBA931" />
                <p>{user?.customer}</p>
              </div>
              <p>{user?.haircut?.name}</p>
              <p>{user?.haircut?.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

//First return getServer and verify if is logged and only then return dashboard
export const getServerSideProps = onlyUserAuthenticated(async (context) => {
  try {
    const apiClient = setupApiClient(context);
    const res = await apiClient.get("/schedule");

    return {
      props: {
        schedule: res.data,
      },
    };
  } catch (error) {
    console.log("Error search list schedule");
    return {
      props: {
        schedule: [],
      },
    };
  }
});
