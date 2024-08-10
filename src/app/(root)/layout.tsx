import { getLoggedInUser, getUserInfo } from "@/src/libs/actions/user.actions";
import Sidebar from "../../components/navigations/sidebar";
import "../globals.css";

import { Inter } from "next/font/google";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Energy Bloom | A minimal smart meter platform",
  description: "Ignite your energy savings",
};
const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }) {

  const user = await getLoggedInUser();
  if (!user) redirect("/sign-in");
  const loggedIn = await getUserInfo({ user_id: user.id });

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <main className="flex h-screen w-full bg-secondary">
          <Sidebar user={loggedIn} />
          {children}
        </main>
      </body>
    </html>
  );
}
