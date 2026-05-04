"use client";
import { useEffect } from "react";

const URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/live-ping`;
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export default function LiveHeartbeat() {
  useEffect(() => {
    const ping = () => {
      if (document.visibilityState !== "visible") return;
      fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: KEY,
          Authorization: `Bearer ${KEY}`,
        },
        body: JSON.stringify({ source: "www" }),
        keepalive: true,
      }).catch(() => {});
    };

    ping();
    const id = window.setInterval(ping, 30000);
    const onVis = () => { if (document.visibilityState === "visible") ping(); };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);
  return null;
}
