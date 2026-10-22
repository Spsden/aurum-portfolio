import type { Metadata } from "next";

import SystemDashboard from "@/components/system/system-dashboard";
import Footer from "@/components/ui/sections/footer";
import Navbar from "@/components/ui/sections/navbar";

export const metadata: Metadata = {
  title: "System Pulse | Suraj Pratap Singh",
  description:
    "Live CPU, memory, network, and storage telemetry from the server hosting this portfolio.",
};

export default function SystemPage() {
  return (
    <>
      <Navbar />
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8 sm:py-12">
        <SystemDashboard />
      </main>
      <Footer />
    </>
  );
}
