import prismaClient from "../../prisma";

interface UserRequestProps {
  user_id: string;
  name: string;
  nameFarm: string;
}

class UpdateUserService {
  async execute({ user_id, name, nameFarm }: UserRequestProps) {
    try {
      const userAlreadyExist = await prismaClient.user.findFirst({
        where: {
          id: user_id,
        },
      });

      if (!userAlreadyExist) {
        console.error('User not exist')
      }

      const userUpdate = await prismaClient.user.update({
        where: {
          id: user_id,
        },
        data: {
          name,
          nameFarm
        },
        select: {
          name: true,
          email: true,
          nameFarm:true
        },
      });

      return userUpdate;
    } catch (error) {
      console.log("Error", error);
      console.error("Error an update user");
    }
  }
}

export { UpdateUserService };
