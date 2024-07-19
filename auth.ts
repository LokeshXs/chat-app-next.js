import NextAuth, { AuthError, type DefaultSession } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { Users } from "./lib/Users";
import { signInSchema } from "./lib/zod";
import { ZodError } from "zod";

declare module "next-auth" {
  interface Session {
    user: {
      userId: string ;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    credentials({
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "text",
        },
      },
      authorize: async (credentials) => {
        try {
          let user = null;
          const { email, password } = signInSchema.parse(credentials);

          user = await Users.getUser(email);

          if (!user) {
            throw new Error("User not found");
          }

          // check password
          if (password !== user.password) {
            throw new Error("Password is incorrect");
          }

          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }

          return null;
        }
      },
    }),
  ],

  callbacks: {
    async signIn(params) {
      return true;
    },

    async session({ session, user, token }) {
      // console.log(`Token is ${JSON.stringify(token)}`);

      session.user.userId = token.sub ||"";

      return session;
    },

    async jwt({ token, user, account, profile }) {
      // console.log(token);
      return token;
    },
  },

  pages: {
    signIn: "/signin",
    error: "/error",
  },
  session: {
    strategy: "jwt",
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
});
