import type { Metadata } from "next";
import { Suspense } from "react";
import SubpageShell from "@/components/SubpageShell";
import ResetPasswordClient from "@/components/ResetPasswordClient";

export const metadata: Metadata = {
  title: "Reset hasła — PetlyAI",
  description:
    "Aby ustawić nowe hasło, otwórz aplikację PetlyAI na swoim telefonie.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResetPasswordPage() {
  return (
    <SubpageShell
      title="Reset hasła"
      subtitle="Aby ustawić nowe hasło, otwórz aplikację PetlyAI na swoim telefonie."
    >
      <Suspense fallback={null}>
        <ResetPasswordClient />
      </Suspense>
    </SubpageShell>
  );
}

