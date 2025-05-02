"use client";

import { ReactNode } from "react";
import LoadingScreen from "./LoadingScreen";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <LoadingScreen />
      {children}
    </>
  );
}
