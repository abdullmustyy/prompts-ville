"use client";

import { usePathname } from "next/navigation";
import Nav from "@components/Nav";

const LayoutProvider = ({ children }) => {
    const pathName = usePathname();
    
    return (
      <>
        {pathName !== "/auth" && <Nav />}
        {children}
      </>
    );
};

export default LayoutProvider;
