import axios from "@/common/axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {

        const res = await axios.post("http://localhost:4000/api/auth/login", {
          username: credentials?.username,
          password: credentials?.password,
        });

        const user = res.data
        
        if (user) {
          
          if(user.mes){
            return null
          }
          else{
            return user;
          }
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;

      return session;
    },
  },
  pages: {
    signIn: "/",
  },
});
