import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import { login, oAUthToLogin } from '../services';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Custom Login',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<any> {
        const user = await login({
          email: credentials!.email,
          password: credentials!.password,
        });
        if (!user) {
          return null;
        }
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || '',
    }),
    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET || '',
    }),
  ],
  session: {
    maxAge: 2592000, /// 30d
    strategy: 'jwt',
    updateAge: 86400, // each day
  },
  callbacks: {
    async session({ session, token }) {
      session = token.user as any;
      return session;
    },
    async jwt({ token, account, user }) {
      if (account) {
        token.access_token = account.access_token;
        switch (account.type) {
          case 'credentials':
            token.user = user;
            break;
          case 'oauth':
            const { email, name, image } = user;
            if (!email || !name || !image) throw new Error('Error in OAuth');
            token.user = await oAUthToLogin({
              email,
              name,
              icon: image,
            });
            break;
          default:
            break;
        }
      }
      return token;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },
};

export default NextAuth(authOptions);
