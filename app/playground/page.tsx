"use client";

import dynamic from "next/dynamic";

const Playground = dynamic(() => import("@/components/playground/playground"), {
  ssr: false,
});

export default function PlaygroundPage() {
  return <Playground />;
}
