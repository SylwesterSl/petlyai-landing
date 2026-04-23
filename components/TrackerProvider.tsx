"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackPageView, heartbeat } from "@/lib/tracker";

export default function TrackerProvider() {
  const pathname = usePathname();
  const started = useRef(false);

  useEffect(() => {
    trackPageView(pathname || "/");
  }, [pathname]);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const id = setInterval(() => heartbeat(), 30_000);
    return () => clearInterval(id);
  }, []);

  return null;
}
