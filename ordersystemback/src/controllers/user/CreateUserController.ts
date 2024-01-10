import {Request, Response, response} from 'express'
import { CreateUserService } from '../../services/user/createUserService'

class CreateUserController {
  async handle(req:Request, res:Response){

    const {name, email, password, nameFarm} = req.body

    const createUserService = new CreateUserService()

    const user = await createUserService.execute({
      name,
      email,
      password,
      nameFarm
    })

    return res.json(user)

  }
}

export {CreateUserController}