export default function HowItWorks() {
  const items = [
    { title: "Dodaj swojego pupila", icon: "🐾" },
    { title: "Udostępniaj zdjęcia", icon: "📸" },
    { title: "Buduj społeczność", icon: "❤️" },
  ];

  return (
    <section className="py-24 text-center">
      <h2 className="text-3xl font-bold mb-12">Jak to działa?</h2>

      <div className="grid md:grid-cols-3 gap-8 px-6">
        {items.map((item) => (
          <div
            key={item.title}
            className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-glow hover:scale-105 transition"
          >
            <div className="text-3xl mb-4">{item.icon}</div>
            <p className="text-lg">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}