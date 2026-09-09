import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import AppLayout from "@/components/AppLayout";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/login");
  }

  const { user } = session;

  return (
    <AppLayout
      user={{
        name: user.name,
        email: user.email,
        picture: user.picture,
      }}
    >
      {children}
    </AppLayout>
  );
}