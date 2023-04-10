import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
export default async function auth(req, res) {
  return await NextAuth(req, res, authOptions)
}
// const prisma = new PrismaClient();
const authOptions = {
  secret: process.env.SECRET,
  providers: [
    GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        allowDangerousEmailAccountLinking: true,
    }),
    // EmailProvider({
    //     server: process.env.EMAIL_SERVER,
    //     from: process.env.EMAIL_FROM,
    //     // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    // }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'invitation code',
      credentials: {
        code: {label: "Code", type: "text", placeholder: "AnyAsk"},
      },
      async authorize(credentials, req) {
        if (credentials.code === process.env.InvitationCode) {
          return {
            id: 1,
            username: "Timothy",
            provider: "invitationCode"
          };
        }
        return null
      }
    })
  ],
  // adapter:PrismaAdapter(prisma),
  callbacks: {
    // TODO：login judgement
    async signIn({user, account, profile, email, credentials}) {
      const isAllowedToSignIn = true

      return isAllowedToSignIn
    },
    async jwt({token, trigger, session, account, profile}) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = account.id;
        // token.provider = account.provider;
      }
      if (trigger === "update" && session?.name) {
        token.name = session
      }
      return token;
    },
    async session({session, trigger, token, user, newSession}) {

      session.accessToken = token.accessToken;
      session.user.id = token.id
      // session.provider = user.provider
      if (trigger === "update" && newSession?.name) {
        session.name = newSession.name;
      }
      // session.someCookie = someCookie;
      return session;
    },
  },
}


