export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center">
        <h1 className="text-4xl font-bold text-blue-600">
          DecisionLens AI
        </h1>

        <p className="mt-4 text-gray-600">
          AI untuk membantu mengambil keputusan finansial.
        </p>

        <button className="mt-6 px-6 py-3 rounded-lg bg-blue-600 text-white">
          Mulai
        </button>
      </div>
    </main>
  );
}