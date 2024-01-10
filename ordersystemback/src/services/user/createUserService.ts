import prismaClient from '../../prisma'
import {hash} from 'bcryptjs'

interface UserRequest {
  name: string,
  email:string,
  password: string
  nameFarm:string 
}

class CreateUserService {
  async execute({name, email, password, nameFarm}: UserRequest) {
    
    if(!email){
      console.error('Email incorrect')
    }

    const userEmailAlreadyExist = await prismaClient.user.findFirst({where:{
      email: email
    }})

    if(userEmailAlreadyExist) {
      console.error('Email already exist')
    }

    const passwordHash = await hash(password, 8)

    const user = await prismaClient.user.create({
      data: {
        name:name,
        email:email,
        password: passwordHash,
        nameFarm,
      },
      select:{
        id:true,
        name:true,
        nameFarm:true, 
        email:true
      }
    })

    return user
  }
}

export { CreateUserService }