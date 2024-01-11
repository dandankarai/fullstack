import { Request, Response } from "express";
import { NewCowService } from "../../services/cow/NewCowService";

class NewCowController {
  async handle(req: Request, res: Response) {

    const {
      dateMilkRegistration,
      name,
      birthForecast,
      dateInsemination,
      nameBull,
      productionPerLiters,
      statusInsemination,
    } = req.body;
    
    const user_id = req.user_id;

    const createCow = new NewCowService();

    const cow = await createCow.execute({
      user_id,
      dateMilkRegistration,
      name,
      birthForecast,
      dateInsemination,
      nameBull,
      productionPerLiters,
      statusInsemination,
    });

    return res.json(cow);
  }
}

export { NewCowController };
