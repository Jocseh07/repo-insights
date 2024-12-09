'use client';
import { useSidebar } from "./ui/sidebar";

import { Button } from "./ui/button";
import { PanelRightClose, PanelRightOpen } from "lucide-react";

export default function SidebarToggle() {
  const { open, setOpen } = useSidebar();
  return (
    <Button
      variant="outline"
      onClick={() => setOpen(!open)}
      size="icon"
      className="p-1"
    >
      {open ? <PanelRightOpen /> : <PanelRightClose />}
    </Button>
  );
}
