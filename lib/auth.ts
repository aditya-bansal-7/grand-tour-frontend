import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
    async jwt({ token, account, profile }) {
      // Upon initial sign in, account and profile are available
      if (account && profile) {
        try {
          const res = await fetch(
            process.env.NEXT_PUBLIC_API_URL
              ? `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`
              : "http://localhost:5000/api/auth/google",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: profile.email,
                firstName: profile.given_name || profile.name?.split(" ")[0],
                lastName: profile.family_name || profile.name?.split(" ").slice(1).join(" "),
                profileImage: (profile as any).picture,
              }),
            }
          );

          if (res.ok) {
            const data = await res.json();
            if (data.success && data.data.token) {
              token.backendToken = data.data.token;
              token.user = data.data; // Includes id, role, etc.
            }
          }
        } catch (error) {
          console.error("Error connecting to backend auth", error);
        }
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      // After sign in, always redirect to dashboard
      return `${baseUrl}/dashboard`;
    },
  },
});
