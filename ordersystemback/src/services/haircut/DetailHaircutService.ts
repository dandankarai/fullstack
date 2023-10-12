import prismaClient from "../../prisma";

interface DetailHaircutServiceProps {
  haircut_id: string;
}

class DetailHaircutService {
  async execute({ haircut_id }: DetailHaircutServiceProps) {
    const haircutDetail = await prismaClient.haircut.findFirst({
      where: {
        id: haircut_id,
      },
    });

    return haircutDetail;
  }
}

export { DetailHaircutService };
