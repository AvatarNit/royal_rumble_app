import NextAuth from "next-auth"
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id"
import { getUserByEmail } from "@/actions/other" // <-- you need this

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID!,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET!,
      issuer: `https://login.microsoftonline.com/${process.env.AUTH_MICROSOFT_ENTRA_TENANT_ID}/v2.0`,
    }),
  ],

  callbacks: {
  async jwt({ token, profile }) {
    if (profile?.email) {
      const dbUser = await getUserByEmail(profile.email)

      if (dbUser) {
        token.userId = dbUser.id
        token.job = dbUser.job
      }
    }

    return token
  },

  async session({ session, token }) {
    session.user.id = token.userId as string
    session.user.job = token.job as string

    return session
  },
}

})
