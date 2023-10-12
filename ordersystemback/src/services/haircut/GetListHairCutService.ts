import prismaClient from "../../prisma";

interface GetListHairCutServiceProps {
  user_id: string;
  status: boolean | string;
}

class GetListHairCutService {
  async execute({ user_id, status }: GetListHairCutServiceProps) {
    const haircut = await prismaClient.haircut.findMany({
      where: {
        user_id: user_id,
        status: status === "true" ? true : false,
      },
    });

    return haircut;
  }
}

export { GetListHairCutService };
