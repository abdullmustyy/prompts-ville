import "@styles/globals.css";
import Provider from "@components/Provider";
import LayoutProvider from "@components/LayoutProvider";
import CreatePromptButton from "@components/CreatePromptButton";
import Nav from "@components/Nav";

export const metadata = {
  title: "PromptsVille",
  description: "Discover and Share AI Prompts",
};

const RootLayout = ({ children, modal }) => {
  return (
    <html lang="en">
      <body className="select-none">
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          {/* <LayoutProvider> */}
          <Nav />
          <main className="app">
            {children}
            {modal}
            <CreatePromptButton />
          </main>
          {/* </LayoutProvider> */}
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
