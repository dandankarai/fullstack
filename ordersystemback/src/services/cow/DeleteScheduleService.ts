import prismaClient from "../../prisma";

interface DeleteScheduleServiceProps {
  schedule_id: string;
  user_id: string;
}

class DeleteScheduleService {
  async execute({ schedule_id, user_id }: DeleteScheduleServiceProps) {
    if (schedule_id === "" || user_id === "") {
      console.error("Error");
    }

    try {
      const belongUser = await prismaClient.service.findFirst({
        where: {
          id: schedule_id,
          user_id: user_id,
        },
      });

      if (!belongUser) {
        console.error("Not authorized");
      }

      await prismaClient.service.delete({
        where: {
          id: schedule_id,
        },
      });

      return "Delete with sucess";
    } catch (error) {
      console.log("Error in delete user", error);
    }
  }
}

export { DeleteScheduleService };
