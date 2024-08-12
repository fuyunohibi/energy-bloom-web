import { getLoggedInUser, getUserInfo } from "@/src/libs/actions/user.actions";
import Sidebar from "../../components/navigations/sidebar";
import "../globals.css";

import { Inter } from "next/font/google";
import { redirect } from "next/navigation";
import RightSidebar from "@/src/components/navigations/right-sidebar";
import { getDevices } from "@/src/libs/actions/device.actions";

export const metadata = {
  title: "Energy Bloom | A minimal smart meter platform",
  description: "Ignite your energy savings",
};
const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }) {
  const user = await getLoggedInUser();
  let loggedIn = null;

  if (!user) {
    loggedIn = await getUserInfo({ user_id: user.id });
      redirect("/sign-in");
  }

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <main className="flex h-screen w-full bg-background">
          <Sidebar user={loggedIn} />
          {children}
        </main>
      </body>
    </html>
  );
}
