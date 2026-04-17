export default function Features() {
  const features = [
    "Profile zwierząt",
    "Zdjęcia i chwile",
    "Lajki & komentarze",
    "Ranking",
  ];

  return (
    <section className="py-24 px-6">
      <h2 className="text-3xl text-center font-bold mb-12">
        Co oferuje PetlyAI?
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {features.map((f) => (
          <div
            key={f}
            className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-glow hover:scale-[1.03] transition"
          >
            <p className="text-xl">{f}</p>
          </div>
        ))}
      </div>
    </section>
  );
}