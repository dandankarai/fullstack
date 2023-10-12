import prismaClient from '../../prisma'
import {hash} from 'bcryptjs'


interface UserRequest {
  name: string,
  email:string,
  password: string
}

class CreateUserService {
  async execute({name, email, password}: UserRequest) {
    
    if(!email){
      throw new Error('Email incorrect')
    }

    const userEmailAlreadyExist = await prismaClient.user.findFirst({where:{
      email: email
    }})

    if(userEmailAlreadyExist) {
      throw new Error('Email already exist')
    }

    const passwordHash = await hash(password, 8)

    const user = await prismaClient.user.create({
      data: {
        name:name,
        email:email,
        password: passwordHash
      },
      select:{
        id:true,
        name:true,
        address:true
      }
    })

    return user
  }
}

export { CreateUserService }