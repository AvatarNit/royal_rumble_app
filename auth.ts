import NextAuth from "next-auth"
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID!,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET!,
      issuer: `https://login.microsoftonline.com/${process.env.AUTH_MICROSOFT_ENTRA_TENANT_ID}/v2.0`,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
  if (!user.email) return false

  const { getUserByEmail } = await import("@/actions/other")
  const dbUser = await getUserByEmail(user.email)

  if (!dbUser) return false

  user.id = dbUser.id.toString()
  user.job = dbUser.job || ""

  return true
},

async jwt({ token, user }) {
  if (user) {
    if (typeof user.id === "string") {
      token.userId = user.id
    }

    if (typeof user.job === "string") {
      token.job = user.job
    }
  }

  return token
},

async session({ session, token }) {
  if (session.user) {
    if (typeof token.userId === "string") {
      session.user.id = token.userId
    }

    if (typeof token.job === "string") {
      session.user.job = token.job
    }
  }

  return session
}
  },
})