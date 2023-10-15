import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { destroyCookie, parseCookies } from "nookies";
import { TokenErros } from "@/services/tokenErrors";

export function onlyUserAuthenticated<P extends { [key: string]: any }>(
  fn: (
    context: GetServerSidePropsContext<P>
  ) => Promise<GetServerSidePropsResult<P>>
) {
  return async (context) => {
    const cookies = parseCookies(context);

    const token = cookies[`@login.token`];

    if (!token) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    try {
      return await fn(context);
    } catch (error) {
      if (error instanceof TokenErros) {
        destroyCookie(context, "@login.token", { path: "/" });

        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
    }
  };
}
