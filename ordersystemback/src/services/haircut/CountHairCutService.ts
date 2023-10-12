import prismaClient from "../../prisma";

interface CountHairCutServiceProps {
  user_id: string;
}

class CountHairCutService {
  async execute({ user_id }: CountHairCutServiceProps) {
    const count = await prismaClient.haircut.count({
      where: {
        user_id: user_id,
      },
    });

    return count;
  }
}

export { CountHairCutService };
