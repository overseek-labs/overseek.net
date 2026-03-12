import { Metadata } from "next";
import { AutomationPreviewClient } from "./client";

export const metadata: Metadata = {
  title: "Automation Animation Preview",
  robots: { index: false, follow: false },
};

export default function AutomationPreviewPage() {
  return <AutomationPreviewClient />;
}
