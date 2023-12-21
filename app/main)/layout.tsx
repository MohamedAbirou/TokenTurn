import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import * as React from "react";
import Navbar from "./_components/Navbar";

const CatalogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MaxWidthWrapper>
      <Navbar />
      <main>{children}</main>
    </MaxWidthWrapper>
  );
};

export default CatalogLayout;
