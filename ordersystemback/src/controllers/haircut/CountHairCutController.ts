import { Request, Response } from "express";
import { CountHairCutService } from "../../services/haircut/CountHairCutService";

class CountHairCutController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    const countHaircuts = new CountHairCutService();

    const count = await countHaircuts.execute({
      user_id,
    });

    return res.json(count);
  }
}

export { CountHairCutController };
