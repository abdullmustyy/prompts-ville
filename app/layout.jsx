import "@styles/globals.css";
import Provider from "@components/Provider";
import LayoutProvider from "@components/LayoutProvider";

export const metadata = {
  title: "Promptville",
  description: "Discover and Share AI Prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="select-none">
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <LayoutProvider>
            <main className="app">{children}</main>
          </LayoutProvider>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
