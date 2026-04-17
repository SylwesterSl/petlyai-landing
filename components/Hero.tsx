export default function Hero() {
  return (
    <section className="pt-32 pb-20 text-center px-6">
      <h1 className="text-4xl md:text-6xl font-bold leading-tight">
        Twoje zwierzę. <br />
        <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Twoja historia.
        </span>{" "}
        Jedna aplikacja.
      </h1>

      <p className="mt-6 text-gray-300">
        Pierwsza aplikacja społecznościowa dla zwierząt
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <button className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-glow">
          Pobierz aplikację
        </button>

        <button className="px-6 py-3 rounded-full glass">
          Dowiedz się więcej
        </button>
      </div>
    </section>
  );
}