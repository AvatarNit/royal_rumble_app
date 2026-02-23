import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      studentId?: string
    } & DefaultSession["user"]
  }

  interface User {
    studentId?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    studentId?: string
  }
}
