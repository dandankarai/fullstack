import { Request, Response } from "express";
import { GetListHairCutService } from "../../services/haircut/GetListHairCutService";

class GetListHairCutController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    const status = req.query.status as string;

    const listHairCut = new GetListHairCutService();

    const hairCut = await listHairCut.execute({
      user_id,
      status,
    });

    return res.json(hairCut);
  }
}

export { GetListHairCutController };
