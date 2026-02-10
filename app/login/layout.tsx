import { getServerSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <>{children}</>
  );
}