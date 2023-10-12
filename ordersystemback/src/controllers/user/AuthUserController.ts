import {Request, Response, response} from 'express'
import { AuthUserService } from '../../services/user/AuthUserService'

class AuthUserController {
  async handle(req:Request, res:Response){

    const {email, password} = req.body

    const authUserService = new AuthUserService()

    const userSession = await authUserService.execute({
      email,
      password
    })

    return res.json(userSession)

  }
}

export {AuthUserController}