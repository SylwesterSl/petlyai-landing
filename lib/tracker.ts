import { supabase } from "@/lib/supabase"; // twój istniejący klient supabase wskazujący na mslnptcmvciwyxwqjvmi

// "www" dla landing, "app" dla aplikacji — ustaw raz na projekt
const SOURCE: "www" | "app" = "www";

let currentPath: string | null = null;

async function send(type: string, event: string | null) {
  try {
    await supabase.functions.invoke("track", {
      body: {
        type,
        event,
        source: SOURCE,
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
      },
    });
  } catch {
    // best-effort, nigdy nie rzucamy
  }
}

export const trackPageView = (path: string) => {
  if (currentPath === path) return;
  currentPath = path;
  return send("page_view", path);
};

export const heartbeat = () => send("heartbeat", `${SOURCE}_heartbeat`);

export const trackClick = (name: string) => send("click", name);

export const trackEvent = (eventType: string, eventName?: string) =>
  send(eventType, eventName ?? null);
