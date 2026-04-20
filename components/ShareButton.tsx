"use client";

export function ShareButton({ label, url }: { label: string; url: string }) {
  return (
    <button
      onClick={() => {
        if (typeof navigator !== "undefined" && (navigator as any).share) {
          (navigator as any).share({
            title: "PetlyAI",
            text: "Sprawdź PetlyAI 🐾",
            url,
          });
        } else if (typeof window !== "undefined") {
          window.open(url, "_blank");
        }
      }}
      className="bg-gradient-to-r from-pink-500 to-purple-500 px-4 md:px-5 py-2 rounded-full text-white text-sm whitespace-nowrap"
    >
      {label}
    </button>
  );
}
