import Sidebar from "../../components/navigations/side-bar";
import "../globals.css";

import { Inter } from "next/font/google";

export const metadata = {
  title: "Energy Bloom | A minimal smart meter platform",
  description: "Ignite your energy savings",
};
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <body className={`${inter.className}`}>
          <main className="flex h-screen w-full">
            <Sidebar 
            />
           {children}
          </main>
        </body>
      </html>
  );
}
