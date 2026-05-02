import SubpageShell from "@/components/SubpageShell";
import ResetPasswordClient from "@/components/ResetPasswordClient";

export const revalidate = 60;

export const metadata = {
  title: "Reset hasła — PetlyAI",
  description:
    "Aby zresetować hasło w PetlyAI, otwórz aplikację mobilną. Zmiana hasła odbywa się wyłącznie w aplikacji.",
  alternates: { canonical: "https://petlyai.pl/reset-password" },
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return (
    <SubpageShell
      title="Reset hasła"
      subtitle="Aby ustawić nowe hasło, otwórz aplikację PetlyAI na swoim telefonie."
    >
      <ResetPasswordClient />
    </SubpageShell>
  );
}
