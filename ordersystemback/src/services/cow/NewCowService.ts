import prismaClient from "../../prisma";

interface NewCowServiceProps {
  user_id: string;
  name: string;
  statusInsemination?: boolean;
  dateInsemination?: string;
  nameBull?: string;
  birthForecast?: string;
  productionPerLiters?: string;
  dateMilkRegistration: string;
}

class NewCowService {
  async execute({
    user_id,
    name,
    statusInsemination,
    dateMilkRegistration,
    nameBull,
    birthForecast,
    productionPerLiters,
    dateInsemination,
  }: NewCowServiceProps) {
    if (!name) {
      console.error("Error in register a new cow");
    }

    const cow = await prismaClient.cow.create({
      data: {
        user_id,
        name,
        statusInsemination,
        dateInsemination,
        dateMilkRegistration,
        nameBull,
        birthForecast,
        productionPerLiters,
      },
      select: {
        name: true,
        statusInsemination: true,
        dateInsemination: true,
        dateMilkRegistration: true,
        nameBull: true,
        birthForecast: true,
        productionPerLiters: true,
      },
    });

    return cow;
  }
}

export { NewCowService };
