import { Request, Response } from "express";
import { NewScheduleService } from "../../services/schedule/NewScheduleService";

class NewScheduleController {
  async handle(req: Request, res: Response) {
    const { customer, haircut_id } = req.body;
    const user_id = req.user_id;

    const createSchedule = new NewScheduleService();

    const schedule = await createSchedule.execute({
      user_id,
      haircut_id,
      customer,
    });

    return res.json(schedule);
  }
}

export { NewScheduleController };
