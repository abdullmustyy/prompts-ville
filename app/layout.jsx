import "@styles/globals.css";
import Provider from "@components/Provider";
import LayoutProvider from "@components/LayoutProvider";
import CreatePromptButton from "@components/CreatePromptButton";

export const metadata = {
  title: "PromptsVille",
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
            <main className="app">
              {children}
              <CreatePromptButton />
            </main>
          </LayoutProvider>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
