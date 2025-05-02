'use client';
import dynamic from "next/dynamic";

const CharacterGrid = dynamic(() => import('@/components/CharacterGrid'), { ssr: false });

export default function Home() {
  return (
    <>
      <CharacterGrid />
    </>
  );
}
