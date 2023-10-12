import { compare } from "bcryptjs";
import prismaClient from "../../prisma";
import { sign } from "jsonwebtoken";

interface AuthUserRequestProps {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthUserRequestProps) {
    const userInfoAuth = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
      include: { subscriptions: true },
    });

    if (!userInfoAuth) {
      throw new Error("Email or Password incorrect");
    }

    const passwordMatch = await compare(password, userInfoAuth?.password);

    if (!passwordMatch) {
      throw new Error("Email or Password incorrect");
    }

    //Generate user token JWT
    const token = sign(
      {
        name: userInfoAuth.name,
        email: userInfoAuth.email,
      },
      process.env.JWT_SECRET,
      {
        subject: userInfoAuth.id,
        expiresIn: "30d",
      }
    );

    return {
      id: userInfoAuth?.id,
      name: userInfoAuth?.name,
      email: userInfoAuth?.email,
      address: userInfoAuth?.address,
      token: token,
      subscription: userInfoAuth?.subscriptions
        ? {
            id: userInfoAuth?.subscriptions?.id,
            status: userInfoAuth?.subscriptions?.status,
          }
        : null,
    };
  }
}

export { AuthUserService };
