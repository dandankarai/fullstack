import { Request, Response } from "express";
import { DeleteScheduleService } from "../../services/cow/DeleteScheduleService";

class DeleteScheduleController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    const schedule_id = req.query.schedule_id as string;

    const deleteScheduleService = new DeleteScheduleService();

    const schedule = await deleteScheduleService.execute({
      user_id,
      schedule_id,
    });

    return res.json(schedule);
  }
}

export { DeleteScheduleController };
