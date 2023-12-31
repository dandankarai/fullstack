import express,{Request,Response,NextFunction} from 'express';
import cors from 'cors';
import { router } from "./routes";

const app = express();
const port = 3333;

app.use(express.json());
app.use(cors());
app.use(router);

app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(port, () => {
  console.log(`SERVER ONLINE IN PORT ${port} :)`);
});
