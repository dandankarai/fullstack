import prismaClient from "../../prisma";

interface HairCutRequest {
  user_id: string;
  name: string;
  price: number;
}

class CreateHairCutService {
  async execute({ user_id, name, price }: HairCutRequest) {
    if (!name || !price) {
      console.error("Invalid!!");
    }

    //Verify how much haircut this user has
    const myHaircuts = await prismaClient.haircut.count({
      where: {
        user_id: user_id,
      },
    });

    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
      include: {
        subscriptions: true,
      },
    });

    // Validation plan free
    if (myHaircuts >= 3 && user?.subscriptions?.status !== "active") {
      console.error("Not authorized");
    }

    const hairCut = await prismaClient.haircut.create({
      data: {
        name: name,
        price: price,
        user_id: user_id,
      },
    });

    return hairCut;
  }
}

export { CreateHairCutService };
