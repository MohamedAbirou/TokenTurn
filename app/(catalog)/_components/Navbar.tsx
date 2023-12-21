"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Link href="/" className="flex items-center py-4 mb-16 text-xl font-medium">
      <Image
        src="/logo.png"
        className="mr-2"
        width={24}
        height={24}
        alt="logo"
      />
      BitBoard
    </Link>
  );
};

export default Navbar;
