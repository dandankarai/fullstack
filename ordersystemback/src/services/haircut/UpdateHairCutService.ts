import prismaClient from "../../prisma";

interface UpdateHairCutServiceProps {
  user_id: string;
  haircut_id: string;
  name: string;
  price: number;
  status: boolean | string;
}

class UpdateHairCutService {
  async execute({
    user_id,
    haircut_id,
    name,
    price,
    status = true,
  }: UpdateHairCutServiceProps) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
      include: {
        subscriptions: true,
      },
    });

    if (user?.subscriptions?.status !== "active") {
      console.error("Not authorized");
    }

    const hairCut = await prismaClient.haircut.update({
      where: {
        id: haircut_id,
      },
      data: {
        name: name,
        price: price,
        status: status === true ? true : false,
      },
    });

    return hairCut;
  }
}

export { UpdateHairCutService };
