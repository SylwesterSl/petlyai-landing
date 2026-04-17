
import "./globals.css";

export const metadata = {
  title: "PetlyAI",
  description: "Social app for pets",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}