export default function Sections() {
    return (
        <>
            {/* === JAK TO DZIAŁA === */}
            <section className="mt-20 text-center px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-10">Jak to działa?</h2>

                <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {/* CARD 1 */}
                    <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:scale-105 transition">
                        <div className="text-4xl mb-4">🐾</div>
                        <h3 className="font-semibold text-lg">Dodaj swojego pupila</h3>
                        <p className="text-sm opacity-70 mt-2">
                            Utwórz profil swojego pupila i dziel się jego przygodami
                        </p>
                    </div>

                    {/* CARD 2 */}
                    <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:scale-105 transition">
                        <div className="text-4xl mb-4">📷</div>
                        <h3 className="font-semibold text-lg">Udostępniaj zdjęcia</h3>
                        <p className="text-sm opacity-70 mt-2">
                            Dziel się zdjęciami i wyjątkowymi momentami
                        </p>
                    </div>

                    {/* CARD 3 */}
                    <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10 hover:scale-105 transition">
                        <div className="text-4xl mb-4">❤️</div>
                        <h3 className="font-semibold text-lg">Buduj społeczność</h3>
                        <p className="text-sm opacity-70 mt-2">
                            Łącz się z miłośnikami zwierząt
                        </p>
                    </div>
                </div>
            </section>

            {/* === CO OFERUJE === */}
            <section className="mt-20 text-center px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-10">Co oferuje PetlyAI?</h2>

                <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    {/* 1 */}
                    <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10 flex items-start gap-4 hover:scale-105 transition">
                        <div className="text-3xl">🐾</div>
                        <div className="text-left">
                            <h3 className="font-semibold">Profile zwierząt</h3>
                            <p className="text-sm opacity-70">Twórz profile i historię pupila</p>
                        </div>
                    </div>

                    {/* 2 */}
                    <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10 flex items-start gap-4 hover:scale-105 transition">
                        <div className="text-3xl">📸</div>
                        <div className="text-left">
                            <h3 className="font-semibold">Zdjęcia i chwile</h3>
                            <p className="text-sm opacity-70">Dodawaj zdjęcia i filmy</p>
                        </div>
                    </div>

                    {/* 3 */}
                    <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10 flex items-start gap-4 hover:scale-105 transition">
                        <div className="text-3xl">👍</div>
                        <div className="text-left">
                            <h3 className="font-semibold">Lajki & komentarze</h3>
                            <p className="text-sm opacity-70">Interakcja społeczności</p>
                        </div>
                    </div>

                    {/* 4 */}
                    <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10 flex items-start gap-4 hover:scale-105 transition">
                        <div className="text-3xl">🏆</div>
                        <div className="text-left">
                            <h3 className="font-semibold">Ranking</h3>
                            <p className="text-sm opacity-70">Najpopularniejsze zwierzaki</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
