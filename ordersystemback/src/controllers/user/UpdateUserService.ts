import prismaClient from "../../prisma";

interface UserRequestProps {
  user_id: string;
  name: string;
  address: string;
}

class UpdateUserService {
  async execute({ user_id, name, address }: UserRequestProps) {
    try {
      const userAlreadyExist = await prismaClient.user.findFirst({
        where: {
          id: user_id,
        },
      });

      if (!userAlreadyExist) {
        throw new Error("User not exist ");
      }

      const userUpdate = await prismaClient.user.update({
        where: {
          id: user_id,
        },
        data: {
          name,
          address,
        },
        select: {
          name: true,
          email: true,
          address: true,
        },
      });

      return userUpdate;
    } catch (error) {
      console.log("Error", error);
      throw new Error("Error an update user");
    }
  }
}

export { UpdateUserService };
