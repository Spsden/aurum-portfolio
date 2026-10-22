"use client";

import { useEffect, useState } from "react";
import VoidNote from "@/components/voidnote/voidnote";
import CapsuleReader from "@/components/voidnote/capsule-reader";

export default function VoidNotePage() {
  const [hasHash, setHasHash] = useState<boolean | null>(null);

  useEffect(() => {
    setHasHash(window.location.hash.length > 1);
  }, []);

  if (hasHash === null) return null;

  if (hasHash) return <CapsuleReader />;

  return <VoidNote />;
}
