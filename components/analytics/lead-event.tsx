"use client";

import { useEffect } from "react";

export function LeadEvent() {
  useEffect(() => {
    window.gtag?.("event", "generate_lead", { form_name: "inquiry" });
  }, []);

  return null;
}
