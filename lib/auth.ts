import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        isRegister: { type: "boolean" }, // Hidden field to distinguish login/register
        firstName: { type: "text" },
        lastName: { type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const endpoint = credentials.isRegister === "true" ? "/api/auth/register" : "/api/auth/login";

        console.log(`Attempting auth at: ${baseUrl}${endpoint}`);

        try {
          const isReg = credentials.isRegister === "true";
          const body = isReg 
            ? {
                email: credentials.email,
                password: credentials.password,
                firstName: credentials.firstName,
                lastName: credentials.lastName,
              }
            : {
                email: credentials.email,
                password: credentials.password,
              };

          const res = await fetch(`${baseUrl}${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });

          const data = await res.json();
          console.log("Auth response data:", data);

          if (res.ok && data.success) {
            return {
              id: data.data.id,
              email: data.data.email,
              name: `${data.data.firstName} ${data.data.lastName}`,
              role: data.data.role,
              backendToken: data.data.token,
              firstName: data.data.firstName,
              lastName: data.data.lastName,
              image: data.data.profileImage,
            };
          }
          
          console.error("Auth failed:", data.message || "Unknown error");
          return null;
        } catch (error) {
          console.error("Critical Auth error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.backendToken) {
        session.backendToken = token.backendToken as string;
      }
      if (token.user) {
        const backendUser = token.user as any;
        session.user = {
          ...session.user,
          ...backendUser,
          image: backendUser.profileImage || session.user?.image || token.picture,
        };
      } else if (token.picture) {
        session.user = {
          ...session.user,
          image: token.picture,
        };
      }
      return session;
    },
    async jwt({ token, user, account, profile }) {
      // For Credentials provider, user is available on sign in
      if (user) {
        token.backendToken = (user as any).backendToken;
        token.user = user;
      }

      // For Google provider
      if (account && profile) {
        try {
          const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
          const res = await fetch(`${baseUrl}/api/auth/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: profile.email,
              firstName: profile.given_name || profile.name?.split(" ")[0],
              lastName: profile.family_name || profile.name?.split(" ").slice(1).join(" "),
              profileImage: (profile as any).picture,
            }),
          });

          if (res.ok) {
            const data = await res.json();
            if (data.success && data.data.token) {
              token.backendToken = data.data.token;
              token.user = data.data;
            }
          }
        } catch (error) {
          console.error("Error connecting to backend auth", error);
        }
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/dashboard`;
    },
  },
});
