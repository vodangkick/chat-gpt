// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github";
export const authOptions = {
    secret: process.env.SECRET,
    providers: [
      GitHubProvider({
        clientId: process.env.GITHUB_ID!,
        clientSecret: process.env.GITHUB_SECRET!
      })
  
    ],
  }
export default NextAuth(authOptions)