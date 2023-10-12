import { Router } from "express";
import { isAuthenticated } from "./middlewares/isAuthenticated";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { UpdateUserController } from "./controllers/user/UpdateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { CreateHairCutController } from "./controllers/haircut/CreateHairCutController";
import { GetListHairCutController } from "./controllers/haircut/GetListHairCutController";
import { UpdateHairCutController } from "./controllers/haircut/UpdateHairCutController";
import { CountHairCutController } from "./controllers/haircut/CountHairCutController";
import { DetailHaircutController } from "./controllers/haircut/DetailHaircutController";

import { NewScheduleController } from "./controllers/schedule/NewScheduleController";
import { ListScheduleController } from "./controllers/schedule/ListScheduleController";
import { DeleteScheduleController } from "./controllers/schedule/DeleteScheduleController";

import { CheckSubscriptionController } from "./controllers/haircut/CheckSubscriptionController";

const router = Router();

// ----------- SCHEDULE ROUTERS
router.post("/schedule", isAuthenticated, new NewScheduleController().handle);
router.get("/schedule", isAuthenticated, new ListScheduleController().handle);
router.delete(
  "/schedule",
  isAuthenticated,
  new DeleteScheduleController().handle
);

// ----------- USER ROUTERS
router.post("/users", new CreateUserController().handle);
router.post("/userSession", new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);
router.put("/users", isAuthenticated, new UpdateUserController().handle);

// ----------- HAIRCUT ROUTERS
router.post("/haircut", isAuthenticated, new CreateHairCutController().handle);
router.get("/haircuts", isAuthenticated, new GetListHairCutController().handle);
router.put("/haircut", isAuthenticated, new UpdateHairCutController().handle);
router.get(
  "/haircut/check",
  isAuthenticated,
  new CheckSubscriptionController().handle
);
router.get(
  "/haircut/count",
  isAuthenticated,
  new CountHairCutController().handle
);

router.get(
  "/haircut/detail",
  isAuthenticated,
  new DetailHaircutController().handle
);

export { router };
