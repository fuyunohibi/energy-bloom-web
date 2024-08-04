import {
  ClerkProvider,
  SignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import "./globals.css";

import { Inter } from "next/font/google";

export const metadata = {
  title: "Energy Bloom | A minimal smart meter platform",
  description: "Ignite your energy savings",
};
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          <main className="flex h-screen justify-center items-center">
            <SignedOut>
              <SignIn routing="hash" />
            </SignedOut>
            <SignedIn>{children}</SignedIn>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
