
export default function DashboardHome() {
  return (
    <div className="w-full h-full p-4 bg-background flex-1 overflow-y-auto scrollable-container">
      <h1 className="text-2xl font-semibold">
        Welcome back!
      </h1>

      <section className="mt-6">
        <h2 className="text-xl font-bold mb-2">Trending Songs</h2>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-bold mb-2">Top Albums</h2>
      </section>
    </div>
  );
}
