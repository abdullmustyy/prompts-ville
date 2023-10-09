import "@styles/globals.css";
import Provider from "@components/Provider";
import CreatePromptButton from "@components/CreatePromptButton";
import Nav from "@components/Nav";

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
          <Nav />
          <main className="app">
            {children}
            <CreatePromptButton />
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
