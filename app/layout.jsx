"use client";

import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { usePathname } from "next/navigation";

export const metadata = {
  title: "Promptville",
  description: "Discover and Share AI Prompts",
};

const RootLayout = ({ children }) => {
  const pathName = usePathname();

  return (
    <html lang="en">
      <body className="select-none">
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            {pathName !== "/auth" && <Nav />}
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
