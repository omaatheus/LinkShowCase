"use client";

import { useStripe } from "@/app/hooks/useStripe";
import { Settings2 } from "lucide-react";

export default function PortalButton() {
  const { handleCreateStripePortal } = useStripe();

  return <button onClick={handleCreateStripePortal} className="flex items-center gap-2 text-sm font-medium text-content-body hover:text-[#4200cd] transition-colors group">
                <span className="hidden md:inline">Portal</span>
                <Settings2 size={16}/>
            </button>;
}