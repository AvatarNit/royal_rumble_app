import NextAuth from "next-auth"
import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      job: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    job: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string
    job: string
  }
}