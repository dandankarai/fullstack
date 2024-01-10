import { compare } from "bcryptjs";
import prismaClient from "../../prisma";
import { sign } from "jsonwebtoken";

interface AuthUserRequestProps {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthUserRequestProps) {
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
      include: { subscriptions: true },
    });

    if (!user) {
      console.error("Email or Password incorrect");
    }

    const passwordMatch = await compare(password, user?.password);

    if (!passwordMatch) {
      console.error("Email or Password incorrect");
    }

    //Generate user token JWT
    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "30d",
      }
    );

    return {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      nameFarm: user?.nameFarm,
      token: token,
      subscription: user?.subscriptions
        ? {
            id: user?.subscriptions?.id,
            status: user?.subscriptions?.status,
          }
        : null,
    };
  }
}

export { AuthUserService };
