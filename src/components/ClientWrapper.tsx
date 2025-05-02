// components/ClientWrapper.tsx
"use client";

import CharacterGrid from "./CharacterGrid";
import LoadingScreen from "./LoadingScreen";

export default function ClientWrapper() {
  return (
    <>
      <LoadingScreen />
      <CharacterGrid />
    </>
  );
}
