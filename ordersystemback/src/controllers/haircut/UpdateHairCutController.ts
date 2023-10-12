import { Request, Response } from "express";
import { UpdateHairCutService } from "../../services/haircut/UpdateHairCutService";

class UpdateHairCutController {
  async handle(req: Request, res: Response) {
    const { name, price, status, haircut_id } = req.body;
    const user_id = req.user_id;

    const updateHairCut = new UpdateHairCutService();

    const haircut = await updateHairCut.execute({
      name,
      price,
      user_id,
      status,
      haircut_id,
    });

    return res.json(haircut);
  }
}

export { UpdateHairCutController };
