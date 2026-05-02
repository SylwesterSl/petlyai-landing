import type { Metadata } from "next";
import { Suspense } from "react";
import SubpageShell from "@/components/SubpageShell";
import ConfirmEmailClient from "@/components/ConfirmEmailClient";

export const metadata: Metadata = {
  title: "Potwierdź email — PetlyAI",
  description: "Aby aktywować konto w PetlyAI, otwórz aplikację na swoim telefonie.",
  robots: { index: false, follow: false },
};

export default function ConfirmEmailPage() {
  return (
    <SubpageShell
      title="Potwierdź email"
      subtitle="Aby aktywować konto w PetlyAI, otwórz aplikację na swoim telefonie."
    >
      <Suspense fallback={null}>
        <ConfirmEmailClient />
      </Suspense>
    </SubpageShell>
  );
}
