export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 glass px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold">🐾 PetlyAI</div>

      <nav className="hidden md:flex gap-6 text-sm">
        <a href="#">Funkcje</a>
        <a href="#">Jak działa</a>
        <a href="#">Galeria</a>
        <a href="#">Kontakt</a>
      </nav>

      <button className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-glow">
        Pobierz
      </button>
    </header>
  );
}