import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        // Here you would typically fetch the user from your database
        // and verify the password. For demonstration, we'll use a hardcoded user.
        const user = {
          id: "1",
          name: "John Doe",
          email: "john.doe@example.com",
        };
        if (email === user.email && password === "password123") {
          return user;
        }
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
