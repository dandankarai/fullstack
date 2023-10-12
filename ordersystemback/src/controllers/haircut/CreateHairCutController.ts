import { Request, Response } from "express";
import { CreateHairCutService } from "../../services/haircut/CreateHairCutService";

class CreateHairCutController {
  async handle(req: Request, res: Response) {
    const { name, price } = req.body;
    const user_id = req.user_id;

    const createHairCutService = new CreateHairCutService();

    const hairCut = await createHairCutService.execute({
      name,
      price,
      user_id,
    });

    return res.json(hairCut);
  }
}

export { CreateHairCutController };
