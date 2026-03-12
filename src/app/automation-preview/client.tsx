"use client";

import { WorkflowAnimation } from "@/components/workflow-animation";

export function AutomationPreviewClient() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F5F3F0",
      }}
    >
      <div style={{ width: 860, height: 540, borderRadius: 16, overflow: "hidden" }}>
        <WorkflowAnimation />
      </div>
    </div>
  );
}
