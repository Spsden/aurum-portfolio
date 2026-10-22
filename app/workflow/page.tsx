"use client";

import Navbar from "@/components/ui/sections/navbar";
import Footer from "@/components/ui/sections/footer";
import WorkflowHero from "@/components/workflow/hero";
import WorkflowOverview from "@/components/workflow/overview";
import WorkflowEditor from "@/components/workflow/editor";
import WorkflowTerminal from "@/components/workflow/terminal";
import WorkflowOS from "@/components/workflow/os";
import WorkflowAI from "@/components/workflow/ai";
import WorkflowPrinciples from "@/components/workflow/principles";

export default function WorkflowPage() {
  return (
    <>
      <Navbar />
      <main>
        <WorkflowHero />
        <WorkflowOverview />
        <WorkflowEditor />
        <WorkflowTerminal />
        <WorkflowOS />
        <WorkflowAI />
        <WorkflowPrinciples />
      </main>
      <Footer />
    </>
  );
}
